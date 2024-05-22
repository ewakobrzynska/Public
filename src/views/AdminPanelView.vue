<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { retriveUserData }  from '../../data/database.js'
import { myData }  from '../../data/database.js'

export default {
  name: 'AdminPanelView',
  
  setup(){
    const auth = getAuth();
    const router = useRouter();
    const isLoggedIn = ref(false);
    const description = ref('');
    const roomNumber = ref(null);

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
      });
      alert('Dane zostały zapisane');
      description.value = '';
      roomNumber.value = null;
    };

    return {
      isLoggedIn,
      handleSignOut,
      description,
      roomNumber,
      submitForm,
    }
  },
  created() {   
    let auth;
    auth = getAuth();
    myData(retriveUserData(auth.currentUser.uid));
  },
};
</script>

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
    <div class="container d-flex justify-content-center" style="background-color: #dee2e6;">
      <v-container fluid class="pa-0 ma-0">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12">
            <router-link to="classroom" class="pa-0 ma-0">
              <v-btn class="mx-1 button">Sale</v-btn>
            </router-link>
            <router-link to="reservations-history" class="pa-0 ma-0">
              <v-btn class="mx-1 button">Historia Rezerwacji</v-btn>
            </router-link>
            <v-btn class="mx-1 button">Dane i Konflikty</v-btn>
          </v-col>
        </v-row>
      </v-container>
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

<style>
@import '@/css/bootstrap.min.css';

v-col, .v-col-12{
  padding: 50px;
  margin-right: auto;
  margin-left: auto;
  background: white;
}
.logout_button {
  margin-left: 20px;
  font-size: 18px;
  border-radius: 5px;
  background-color: #888484;
  color: white;
  padding-top: 5px;
}

.button {
  font-size: 18px;
  border-radius: 5px;
  background-color: #888484;
  padding-top: 5px;
  color: white;
}

v-btn:hover {
  background-color: #000000;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333333;
}
.container {
  margin-top: 0px;
  margin-bottom: 0px;
}
form {
  max-width: 500px;
  margin: auto;
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  background-color: #888484;
  border-color: #888484;
}

.btn-primary:hover {
  background-color: #000000;
  border-color: #000000;
}
</style>
