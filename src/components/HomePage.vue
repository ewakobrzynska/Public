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
      
      <!-- Przyciski do przekierowań -->
      <div class="row">
        <div class="column">
              <p v-if="isHomePage">Witaj w systemie rezerwacji sal!<br> Tutaj możesz przeglądać i rezerwować sale do różnych celów edukacyjnych i spotkań. Nasza platforma jest prosta w obsłudze, zapewniając szybkie i wygodne dokonywanie rezerwacji online.<br><br> Dziękujemy za korzystanie z naszego systemu!</p>
        </div>
        <div class="column">
          <img src="https://img.freepik.com/premium-vector/lesson-pupils-icon-element-education-icon-vector-illustration-eps-10-stock-image_797523-2038.jpg" class="image">
          <div class="overlay">
            <router-link to="classroom" class="pa-0 ma-0">
                <v-btn>Sale</v-btn>
            </router-link>
          </div>
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

.column {
  float: left;
  padding: 5px;
  position: relative;
  width: 80%;
  max-width: 500px;
  align: center;
}

.row{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5rem;
}

.overlay {
  position: absolute; 
  bottom: -2rem; 
  color: #f1f1f1; 
  width: 100%;
  transition: .5s ease;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
}

.image {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
