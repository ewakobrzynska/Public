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
      reservations: [
        { id: '1', room: 'A101', date: '2024-06-01', start: '08:00', finish: '09:00', firstname: 'Jan', lastname: 'Kowalski', email: 'jan.kowalski@example.com', state: 'nowa' },
        { id: '2', room: 'A101', date: '2024-06-01', start: '08:00', finish: '09:00', firstname: 'Anna', lastname: 'Nowak', email: 'anna.nowak@example.com', state: 'nowa' },
        { id: '3', room: 'A103', date: '2024-06-01', start: '10:00', finish: '11:00', firstname: 'Piotr', lastname: 'Wiśniewski', email: 'piotr.wisniewski@example.com', state: 'konflikt nowa' },
        { id: '4', room: 'A104', date: '2024-06-01', start: '11:00', finish: '12:00', firstname: 'Katarzyna', lastname: 'Wójcik', email: 'katarzyna.wojcik@example.com', state: 'konflikt zaimportowana' },
        { id: '5', room: 'A105', date: '2024-06-01', start: '12:00', finish: '13:00', firstname: 'Tomasz', lastname: 'Kaczmarek', email: 'tomasz.kaczmarek@example.com', state: 'nowa' },
        { id: '6', room: 'A106', date: '2024-06-01', start: '13:00', finish: '14:00', firstname: 'Magdalena', lastname: 'Mazur', email: 'magdalena.mazur@example.com', state: 'zaakceptowane' },
        { id: '7', room: 'A107', date: '2024-06-01', start: '14:00', finish: '15:00', firstname: 'Marcin', lastname: 'Zieliński', email: 'marcin.zielinski@example.com', state: 'konflikt nowa' },
        { id: '8', room: 'A108', date: '2024-06-01', start: '15:00', finish: '16:00', firstname: 'Agnieszka', lastname: 'Szymańska', email: 'agnieszka.szymanska@example.com', state: 'konflikt zaimportowana' },
        { id: '9', room: 'A109', date: '2024-06-01', start: '16:00', finish: '17:00', firstname: 'Paweł', lastname: 'Dąbrowski', email: 'pawel.dabrowski@example.com', state: 'nowa' },
        { id: '10', room: 'A110', date: '2024-06-01', start: '17:00', finish: '18:00', firstname: 'Joanna', lastname: 'Lewandowska', email: 'joanna.lewandowska@example.com', state: 'zaakceptowane' },
        { id: '11', room: 'A111', date: '2024-06-02', start: '08:00', finish: '09:00', firstname: 'Rafał', lastname: 'Krawczyk', email: 'rafal.krawczyk@example.com', state: 'konflikt nowa' },
        { id: '12', room: 'A112', date: '2024-06-02', start: '09:00', finish: '10:00', firstname: 'Ewa', lastname: 'Zawadzka', email: 'ewa.zawadzka@example.com', state: 'konflikt zaimportowana' },
        { id: '13', room: 'A113', date: '2024-06-02', start: '10:00', finish: '11:00', firstname: 'Grzegorz', lastname: 'Piotrowski', email: 'grzegorz.piotrowski@example.com', state: 'nowa' },
        { id: '14', room: 'A114', date: '2024-06-02', start: '11:00', finish: '12:00', firstname: 'Małgorzata', lastname: 'Grabowska', email: 'malgorzata.grabowska@example.com', state: 'zaakceptowane' },
        { id: '15', room: 'A115', date: '2024-06-02', start: '12:00', finish: '13:00', firstname: 'Andrzej', lastname: 'Pawlak', email: 'andrzej.pawlak@example.com', state: 'konflikt nowa' },
        { id: '16', room: 'A116', date: '2024-06-02', start: '13:00', finish: '14:00', firstname: 'Alicja', lastname: 'Michalska', email: 'alicja.michalska@example.com', state: 'konflikt zaimportowana' },
        { id: '17', room: 'A117', date: '2024-06-02', start: '14:00', finish: '15:00', firstname: 'Dawid', lastname: 'Wojciechowski', email: 'dawid.wojciechowski@example.com', state: 'nowa' },
        { id: '18', room: 'A118', date: '2024-06-02', start: '15:00', finish: '16:00', firstname: 'Natalia', lastname: 'Kamińska', email: 'natalia.kaminska@example.com', state: 'zaakceptowane' },
        { id: '19', room: 'A119', date: '2024-06-02', start: '16:00', finish: '17:00', firstname: 'Artur', lastname: 'Sikora', email: 'artur.sikora@example.com', state: 'konflikt nowa' },
        { id: '20', room: 'A120', date: '2024-06-02', start: '17:00', finish: '18:00', firstname: 'Monika', lastname: 'Włodarczyk', email: 'monika.wlodarczyk@example.com', state: 'konflikt zaimportowana' }
      ]
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