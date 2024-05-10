<script>
import arrowback from "@/components/ArrowBack.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {myData, getHistoryReservations, retriveUserData} from "../../data/database";

export default {
  name: 'ReservationsHistoryView',
  components: {
    arrowback
  },
  data() {
    return {
      reservations: []
    }
  },
  setup(){
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
      this.reservations = await getHistoryReservations();
    } catch (error) {
      console.error("Error while retrieving data:", error);
    }
  },
}

</script>

<template>
  <div class="header-container">
    <router-link to="/adminpanel" class="pa-0 ma-0"><arrowback/></router-link>
  </div>
  <div class="table-container">
    <h1 style="margin-bottom: 20px">Historia rezerwacji</h1>
    <table class="reservations-history-table">
      <thead>
      <tr>
        <th>Data</th>
        <th>Godziny</th>
        <th>Numer sali</th>
        <th>Nazwa rezerwacji</th>
        <th>Osoba rezerwująca</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(reservation, index) in reservations" :key="index">
        <td>{{ reservation.date }}</td>
        <td>{{ reservation.start }} - {{ reservation.finish }}</td>
        <td>{{ reservation.roomNumber }}</td>
        <td>{{ reservation.name }}</td>
        <td>{{ reservation.person }}</td>
      </tr>
      </tbody>
    </table>
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
</template>

<style scoped>
.header-container {
  position: relative;
  background-color: #c5c5c5;
  height: 80px;
  width: 100%;
}

.table-container {
  margin: 30px auto 30px auto;
  width: 80%;
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

.reservations-history-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.reservations-history-table tr:hover {
  background-color: #ddd;
}
</style>