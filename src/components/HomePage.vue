<template>
  <div id="app">
    <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
      <div class="container d-flex justify-content-between">
        <h1>System Rezerwacji</h1>
        <div>
          <router-link to="adminpanel" class="pa-0 ma-0">
            <button class="btn btn-primary btn-sm">Panel Administratora</button>
          </router-link>
          <router-link to="classroom" class="pa-0 ma-0">
            <button class="btn btn-primary btn-sm">Sale</button>
          </router-link>
          <router-link to="reservations" class="pa-0 ma-0">
            <button class="btn btn-primary btn-sm">Rezerwacje</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <!-- Pole formularza do filtrowania -->
      <div class="row mb-3">
        <div class="col">
          <input type="number" v-model="filterCapacity" class="form-control" placeholder="Filtruj po ilości miejsc...">
        </div>
      </div>

      <!-- Tabela z salami -->
      <div class="row">
        <div class="col">
          <h2 class="mb-3">Dostępne sale</h2>
          <table class="table table-hover">
            <thead class="thead-dark">
            <tr>
              <th scope="col">Numer sali</th>
              <th scope="col">Pojemność</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="room in filteredRooms" :key="room.name">
              <td>{{ room.name }}</td>
              <td>{{ room.capacity }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Sekcja lokalizacji i informacji -->
      <div class="row mt-5">
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
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      rooms: [
        { name: 'A-0-11', capacity: 18 },
        { name: 'A-0-13', capacity: 33 },
        { name: 'A-0-15', capacity: 24 }
      ],
      filterCapacity: ''
    }
  },
  computed: {
    filteredRooms() {
      return this.filterCapacity ? this.rooms.filter(room => room.capacity >= this.filterCapacity) : this.rooms;
    }
  },
}
</script>

<style>
@import '@/css/bootstrap.min.css';

.d-flex {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e3e4e6;
}

h1 {
  color: #333;
}

</style>