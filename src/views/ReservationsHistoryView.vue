<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted, ref } from "vue";
import {
  myData,
  getHistoryReservations,
  retriveUserData,
  getAllReservations,
  updateReservationStatus
} from "../../data/database";

export default {
  name: 'ReservationsHistoryView',
  data() {
    return {
      reservations: [],
      allReservations: []
    }
  },
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    return {
      isLoggedIn
    }
  },
  created() {
    let auth;
    auth = getAuth();
    myData(retriveUserData(auth.currentUser.uid));
  },
  async mounted() {
    try {
      let reservations = await getHistoryReservations();
      let allReservations = await getAllReservations();

      // Convert reservations object to array if it's not already an array
      this.reservations = Array.isArray(reservations) ? reservations : Object.values(reservations);
      this.allReservations = Array.isArray(allReservations) ? allReservations : Object.values(allReservations);

      this.compareReservations();
      console.error(this.reservations);
    } catch (error) {
      console.error("Error while retrieving data:", error);
    }
  },
  methods: {
    compareReservations() {
      this.reservations.forEach(historyReservation => {
        this.allReservations.forEach(currentReservation => {
          if (historyReservation.date === currentReservation.date) {
            const historyStart = new Date(`1970-01-01T${historyReservation.start}:00`);
            const historyFinish = new Date(`1970-01-01T${historyReservation.finish}:00`);
            const currentStart = new Date(`1970-01-01T${currentReservation.start}:00`);
            const currentFinish = new Date(`1970-01-01T${currentReservation.finish}:00`);

            if (
                (historyStart < currentFinish && historyFinish > currentStart) ||
                (currentStart < historyFinish && currentFinish > historyStart)
            ) {
              historyReservation.conflict = true;
            }
          }
        });
      });
    },

    async rejectReservation(index) {
      try {
        const reservation = this.reservations[index];
        if (!reservation) {
          console.error("Reservation not found at index:", index);
          return;
        }

        const reservationId = reservation.id;
        if (!reservationId) {
          console.error("Reservation ID is not defined");
          return;
        }

        console.log(`Updating reservation ID ${reservationId} to status 'REJECTED'`);

        await updateReservationStatus(reservationId, 'REJECTED');

        this.reservations[index].status = 'REJECTED';
      } catch (error) {
        console.error("Error while rejecting reservation:", error);
      }
    },

    async acceptReservation(index) {
      try {
        const reservation = this.reservations[index];
        if (!reservation) {
          console.error("Reservation not found at index:", index);
          return;
        }

        const reservationId = reservation.id;
        if (!reservationId) {
          console.error("Reservation ID is not defined");
          return;
        }

        console.log(`Updating reservation ID ${reservationId} to status 'ACCEPTED'`);

        await updateReservationStatus(reservationId, 'ACCEPTED');

        this.reservations[index].status = 'ACCEPTED';
      } catch (error) {
        console.error("Error while accepting reservation:", error);
      }
    },

  }
}
</script>
<template>
  <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
    <div class="container d-flex justify-content-between">
      <h1 v-if="isHomePage">System Rezerwacji</h1>
      <h1 v-else>Historia rezerwacji</h1>
    </div>
  </div>

  <div class="table-container">
    <table class="reservations-history-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Data</th>
        <th>Godziny</th>
        <th>Numer sali</th>
        <th>Nazwa rezerwacji</th>
        <th>Osoba rezerwująca</th>
        <th>Status</th>
        <th>Akcje</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(reservation, index) in reservations" 
          :key="index" 
          :class="{'conflict': reservation.conflict, 'accepted': reservation.status === 'ACCEPTED'}">
        <td>{{ reservation.id }}</td>
        <td>{{ reservation.date }}</td>
        <td>{{ reservation.start }} - {{ reservation.finish }}</td>
        <td>{{ reservation.roomNumber }}</td>
        <td>{{ reservation.name }}</td>
        <td>{{ reservation.person }}</td>
        <td>{{ reservation.status }}</td>
        <td>
          <button class="reject-button" @click="rejectReservation(index)" :disabled="reservation.status === 'Odrzucone'">Odrzuć</button>
          <button @click="acceptReservation(index)" :disabled="reservation.status === 'Zaakceptowane'">Akceptuj</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <footer class="bg-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3>Lokalizacja</h3>
          <p>ul. Stanisława Łojasiewicza 11, 00-000 Kraków</p>
          <p><strong>Godziny otwarcia:</strong> Pon - Pt: 8:00 - 20:00</p>
        </div>
        <div class="col-md-6">
          <h3>Informacje kontaktowe</h3>
          <p>Email: kontakt@systemrezerwacji.pl</p>
          <p>Telefon: 123 456 789</p>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
@import '@/css/bootstrap.min.css';

.header-container {
  position: relative;
  background-color: #c5c5c5;
  height: 80px;
  width: 100%;
}

.table-container {
  margin: 40px 40px 40px 40px;
}

.reservations-history-table {
  width: 100%;
  border-collapse: collapse;
}

.reservations-history-table th,
.reservations-history-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.reservations-history-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.reservations-history-table tr:hover {
  background-color: #ddd;
}

.conflict {
  background-color: red;
}

.accepted {
  background-color: lightgreen;
}

.reject-button {
  color: red;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
