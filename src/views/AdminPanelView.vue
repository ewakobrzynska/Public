<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { retriveUserData }  from '../database.js'
import { myData }  from '../database.js'
import arrowback from '../components/ArrowBack.vue'

export default {
  name: 'AdminPanelView',
  components: {
    arrowback
  },
  setup(){
    const auth = getAuth();
    const router = useRouter();
    const isLoggedIn = ref(false);

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

    return {
      isLoggedIn,
      handleSignOut,
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
  <v-container fluid class="pa-0 ma-0" style="background-color: #c5c5c5; height: 100vh; display: flex; align-items: center; justify-content: center;">
    <router-link to="/" class="pa-0 ma-0"><arrowback /></router-link>
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12">
        <h1 class="title mb-3">System rejestracji</h1>
        <v-btn class="mx-3 button">Sale</v-btn>
        <v-btn class="mx-3 button">Rezerwacje</v-btn>
        <v-btn class="mx-3 button">Dane i Konflikty</v-btn>
        <v-btn @click="handleSignOut" v-if="isLoggedIn" class="logout_button">Wyloguj</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
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
  background-color: #e08609;
  padding-top: 5px;
}

v-btn:hover {
  background-color: #000000;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333333;
}
</style>