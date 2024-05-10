<template>
  <div>
    <h1>Lista Rezerwacji Sali</h1>
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
        <tr v-for="(reservation, index) in reservations" :key="index" :class="{ 'accepted': reservation.state === 'zaakceptowane', 'conflict': reservation.state === 'konflikt' }">
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
  </div>


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
    }
  },
  mounted() {
    const db = getDatabase();
    const reservationsRef = dbRef(db, 'reservations');

    onValue(reservationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.reservations = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      }
    });
  }
}
</script>

<style scoped>
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

.reservation-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.reservation-table tr:hover {
  background-color: #ddd;
}

.accepted {
  background-color: lightgreen;
}

.conflict {
  background-color: salmon;
}
</style>