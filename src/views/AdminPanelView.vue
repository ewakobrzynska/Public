<template>
  <div id="app">
    <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
      <div class="container d-flex justify-content-between">
        <h1 v-if="isHomePage">System Rezerwacji</h1>
        <h1 v-else>Panel Administratora</h1>
        <div>
          <router-link to="adminpanel" class="pa-0 ma-0">
            <v-btn @click="handleSignOut" v-if="isLoggedIn" class="logout_button">Wyloguj</v-btn>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div class="row">
      <div class="column">
        <img src="https://img.freepik.com/premium-vector/lesson-pupils-icon-element-education-icon-vector-illustration-eps-10-stock-image_797523-2038.jpg" class="image">
        <div class="overlay">
          <router-link to="classroom" class="pa-0 ma-0">
            <v-btn>Sale</v-btn>
          </router-link>
        </div>
      </div>
      <div class="column">
        <img src="https://i.pinimg.com/736x/ad/8c/6a/ad8c6ae2a9823de975790775d8dc9200.jpg"  style="width:100%" class="image">
        <div class="overlay">
          <router-link to="reservations-history" class="pa-0 ma-0">
            <v-btn>Historia rezerwacji</v-btn>
          </router-link>
        </div>
      </div>
      <div class="column">
        <img src="https://t3.ftcdn.net/jpg/04/57/16/48/360_F_457164865_FPfUR4Hi6RuNPa6sqITpYgkWQMw5pPv4.jpg" style="width:100%" class="image">
        <div class="overlay">
          <router-link to="" class="pa-0 ma-0">
            <v-btn>Dane i konflikty</v-btn>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="description" class="form-label">Opis</label>
          <input type="text" class="form-control" id="description" v-model="description" required>
        </div>
        <div class="mb-3">
          <label for="roomNumber" class="form-label">Numer sali</label>
          <input type="text" class="form-control" id="roomNumber" v-model="roomNumber" required>
        </div>
        <div class="mb-3">
          <label for="hasComputer" class="form-label">Wyposażenie w komputery</label>
          <select class="form-select" id="hasComputer" v-model="hasComputer" required>
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Wyślij</button>
      </form>
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
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getDatabase, ref as dbRef, set } from "firebase/database";

export default {
  name: 'AdminPanelView',

  setup(){
    const auth = getAuth();
    const router = useRouter();
    const isLoggedIn = ref(false);
    const description = ref('');
    const roomNumber = ref(null);
    const hasComputer = ref('false'); // Default value for hasComputer

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if(user){
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        router.push("/login");
      });
    };

    const submitForm = () => {
      const db = getDatabase();
      const dataRef = dbRef(db, 'opissal/' + roomNumber.value);
      set(dataRef, {
        description: description.value,
        roomNumber: roomNumber.value,
        hasComputer: hasComputer.value === 'true' // Convert hasComputer to boolean
      });
      alert('Dane zostały zapisane');
      description.value = '';
      roomNumber.value = null;
      hasComputer.value = 'false'; // Reset hasComputer after submission
    };

    return {
      isLoggedIn,
      handleSignOut,
      description,
      roomNumber,
      hasComputer,
      submitForm,
    }
  }
};
</script>

<style scoped>
@import '@/css/bootstrap.min.css';

/* Add any scoped styles if necessary */
</style>
