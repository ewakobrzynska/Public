<template>
  <div>
    <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
      <div class="container d-flex justify-content-between">
        <h1 v-if="isHomePage">System Rezerwacji</h1>
        <h1 v-else>Katalog sal</h1>
        <div class="row mb-3">
          <div class="col">
            <input type="number" v-model="filterCapacity" class="form-control" placeholder="Filtruj po ilości miejsc...">
          </div>
          <div class="col">
            <label>
              <input type="checkbox" v-model="filterComputer">
              Tylko sale komputerowe
            </label>
          </div>
        </div>
      </div>
    </div>

    <table class="classroom-table">
      <thead>
      <tr>
        <th>Strefa</th>
        <th>Ulica</th>
        <th>Budynek</th>
        <th>Jednostka organizacyjna</th>
        <th>Numer sali</th>
        <th>Liczba miejsc</th>
        <th>Komputerowa</th>
        <th>Numer telefonu do rezerwacji</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(room, index) in filteredRooms" :key="index">
        <td>{{ room.zone }}</td>
        <td>{{ room.street }}</td>
        <td>{{ room.building }}</td>
        <td>{{ room.organizationalUnit }}</td>
        <td><router-link :to="{ name: 'classroom-details', params: { roomNumber: index }}"> {{ room.roomNumber }}</router-link></td>
        <td>{{ room.numberOfPlaces }}</td>
        <td>{{ room.hasComputer ? 'Tak' : 'Nie' }}</td>
        <td>{{ room.phoneNumberForBookings }}</td>
      </tr>
      <tr v-if="filteredRooms.length === 0">
        <td colspan="8" class="text-center">Brak dostępnych sal spełniających kryteria.</td>
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
import { retrieveRoomData } from "../../data/database.js";

export default {
  name: 'ClassroomView',
  data() {
    return {
      rooms: [],
      filterCapacity: '',
      filterComputer: false
    };
  },
  computed: {
    filteredRooms() {
      let filtered = this.rooms;

      if (this.filterCapacity) {
        filtered = filtered.filter(room => room.numberOfPlaces >= this.filterCapacity);
      }

      if (this.filterComputer) {
        filtered = filtered.filter(room => room.hasComputer === true);
      }

      return filtered;
    }
  },
  async mounted() {
    try {
      const roomDataPromises = [];
      for (let i = 0; i <= 29; i++) {
        roomDataPromises.push(retrieveRoomData(i));
      }
      const allRoomData = await Promise.all(roomDataPromises);
      this.rooms = allRoomData.map(room => ({
        zone: room.zone,
        street: room.street,
        building: room.building,
        organizationalUnit: room.organizationalUnit,
        roomNumber: room.roomNumber,
        numberOfPlaces: room.numberOfPlaces,
        phoneNumberForBookings: room.phoneNumberForBookings,
        hasComputer: room.hasComputer // Dodajemy hasComputer do obiektu sali
      }));
    } catch (error) {
      console.error("Błąd podczas pobierania danych z bazy:", error);
    }
  },
};
</script>

<style>
@import '@/css/bootstrap.min.css';

.classroom-table {
  width: 90%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  margin-left: 4.5rem;
}

.classroom-table th,
.classroom-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.classroom-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.classroom-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.classroom-table tr:hover {
  background-color: #ddd;
}

.form-control {
  width: 110%;
}
</style>
