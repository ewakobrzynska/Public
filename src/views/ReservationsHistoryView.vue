<script>
import arrowback from "@/components/ArrowBack.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {myData, getAllReservations, retriveUserData} from "../../data/database";

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
      this.reservations = await getAllReservations();
    } catch (error) {
      console.error("Error while retrieving data:", error);
    }
  },
}

</script>

<template>
  <div class="container" style="background-color: #c5c5c5; height: 80px; width: 100%">
    <router-link to="/adminpanel" class="pa-0 ma-0"><arrowback /></router-link>
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
</template>

<style scoped>
.table-container {
  margin: 30px auto 30px auto;
  width: 80%
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