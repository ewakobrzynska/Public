<script>

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {onMounted, ref} from "vue";
import {myData, retrieveIssues, retriveUserData} from "../../data/database";

export default {
  name: 'ReservationsHistoryView',
  data() {
    return {
      reservations: [],
      loading: true
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

    retrieveIssues()
        .then(data => {
            this.issues = data;
            this.loading = false; // Set loading flag to false
        })
            .catch(error => {
            console.error("Error retrieving data:", error);
        });
  },
  methods: {
    goBack() {
        this.$router.push({ path: '/adminpanel' });
    }
  }
}

</script>

<template>
    <div class="issuesContainer">
        <div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
            <div class="container d-flex justify-content-between">
            <v-btn size="35" icon="mdi-arrow-left" class="arr-btn" @click="goBack"></v-btn>
            <h1 v-if="isHomePage">System Rezerwacji</h1>
            
            <h1 v-else>Zgłoszone problemy</h1>
            </div>
        </div>

        <div class="table-container">
            <div v-if="loading">
                Loading...
            </div>

            <table class="reservations-history-table" v-else>
                <thead>
                    <tr>
                        <th>Numer sali</th>
                        <th>Osoba zgłaszająca</th>
                        <th>Data zgłoszenia</th>
                        <th>Opis</th>

                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="(issue, index) in issues" :key="index">
                            <td>{{ issue.roomNumber }}</td>
                            <td>{{ issue.userEmail }}</td>
                            <td>{{ issue.data }}</td>
                            <td>{{ issue.description }}</td>

                        </tr>
                </tbody>
            </table>
        </div>

        <footer class="bg-light py-1 issuesFooter">
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

<style scoped>
@import '@/css/bootstrap.min.css';

.issuesContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.issuesFooter {
  flex: 0 0 auto; /* Optional for specific use cases */
  margin-top: auto; /* Push footer to bottom */
}

.header-container {
  position: relative;
  background-color: #c5c5c5;
  height: 80px;
  width: 100%;
}

.table-container {
  margin: 40px 40px 40px 40px;
  margin: 2rem 5rem;
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
  text-align: center;
}

.reservations-history-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

th:nth-child(1) {
        width: 10%;
    }

    th:nth-child(2) {
        width: 15%;
    }

    th:nth-child(3) {
        width: 15%;
    }

    th:nth-child(4) {
        width: 200px;
    }

.reservations-history-table tr:hover {
  background-color: #ddd;
}

.arr-btn {
    position: absolute;
    left: 2rem;
    top: 2rem;
}
</style>

