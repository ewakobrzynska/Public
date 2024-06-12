<template>
  <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
        <div class="container d-flex justify-content-between">
          <h1 v-if="isHomePage">System Rezerwacji</h1>
          <h1 v-else>Historia rezerwacji</h1>
        </div>
    </div>

    <table class="reservation-table">
      <thead>
        <tr>
          <th>SALA</th>
          <th>TERMIN</th>
          <th>IMIĘ</th>
          <th>NAZWISKO</th>
          <th>EMAIL</th>
          <th>STAN</th>
          <th>AKCJE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="reservations.length === 0">
          <td colspan="7">Brak rezerwacji</td>
        </tr>
        <tr v-for="(reservation, index) in reservations" :key="index" :class="getStateClass(reservation.state)">
          <td>{{ reservation.room }}</td>
          <td>{{ reservation.date }} {{ reservation.start }} - {{ reservation.finish }}</td>
          <td>{{ reservation.firstname }}</td>
          <td>{{ reservation.lastname }}</td>
          <td>{{ reservation.email }}</td>
          <td>{{ reservation.state }}</td>
          <td>
            <button @click="cancelReservation(reservation.id)">Odwołaj</button>
          </td>
        </tr>
      </tbody>
    </table>

  <!-- Footer -->
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


<script>
import { getDatabase, ref as dbRef, onValue, remove } from "firebase/database";

export default {
  name: 'ReservationsView',
  data() {
    return {
      reservations: []
    }
  },
  methods: {
    cancelReservation(reservationId) {
      const db = getDatabase();
      const reservationRef = dbRef(db, 'reservations/' + reservationId);
      remove(reservationRef);
    },
    getStateClass(state) {
      console.log(`State: ${state}`);
      switch (state) {
        case 'nowa':
          return 'new';
        case 'zaakceptowane':
          return 'accepted';
        case 'konflikt nowa':
          return 'conflict-new';
        case 'konflikt zaimportowana':
          return 'conflict-imported';
        default:
          return '';
      }
    },
    checkConflicts() {
  const updatedReservations = this.reservations.map(reservation => {
    const conflicts = this.reservations.filter(other =>
      other.room === reservation.room &&
      other.date === reservation.date &&
      other.start === reservation.start &&
      other.finish === reservation.finish &&
      other.id !== reservation.id
    );
    if (conflicts.length > 0) {
      // Jeśli znaleziono konflikty, zwróć kopię rezerwacji z zaktualizowanym stanem
      return { ...reservation, state: 'konflikt nowa' };
    } else {
      // Jeśli nie ma konfliktów, zwróć oryginalną rezerwację
      return reservation;
    }
  });

  // Zaktualizuj tablicę rezerwacji z zaktualizowanymi rezerwacjami
  this.reservations = updatedReservations;
}


  },
  mounted() {
    const db = getDatabase();
    const reservationsRef = dbRef(db, 'reservations');

    onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.reservations = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        this.checkConflicts();
      }
    });
  }
}
</script>

<style scoped>
@import '@/css/bootstrap.min.css';
.reservation-table {
  width: 100%;
  border-collapse: collapse;
}

.reservation-table th,
.reservation-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.reservation-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.reservation-table tr:hover {
  background-color: #ddd;
}

.new {
  background-color: white;
}

.accepted {
  background-color: lightgreen;
}

.conflict-new {
  background-color: #FCED8D;
}

.conflict-imported {
  background-color: #E66262;
}

</style>
