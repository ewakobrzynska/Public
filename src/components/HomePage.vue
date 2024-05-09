<template>
  <div id="app">
    <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
      <div class="container d-flex justify-content-between">
        <h1 v-if="isHomePage">System Rezerwacji</h1>
        <h1 v-else>Panel Administratora</h1>
        <div>
          <router-link to="adminpanel" class="pa-0 ma-0">
            <button class="btn btn-primary btn-sm">Panel Administratora</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container py-5" v-if="isHomePage">
      <p v-if="isHomePage">Witaj w systemie rezerwacji sal! Znajdziesz tutaj dostępne sale oraz możliwość dokonywania rezerwacji.</p>
      <!-- Przyciski do przekierowań -->
      <div class="row mt-5">
        <div class="col-md-6 offset-md-3 text-center">
          <p v-if="isHomePage">Dostępne sale znajdziesz tutaj:</p>
          <router-link to="classroom" class="pa-0 ma-0 mr-3">
            <button class="btn btn-primary btn-lg">Sale</button>
          </router-link>
        </div>
        <div class="col-md-6 offset-md-3 text-center">
          <p></p>
          <p v-if="isHomePage">Wykonane rezerwacje:</p>
          <router-link to="reservations" class="pa-0 ma-0">
            <button class="btn btn-primary btn-lg">Rezerwacje</button>
          </router-link>
        </div>
      </div>
    </div>

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
export default {
  name: 'App',
  computed: {
    isHomePage() {
      // Sprawdza czy jesteśmy na stronie głównej (czy ścieżka to "/")
      return this.$route.path === '/';
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
