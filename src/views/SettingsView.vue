<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { retriveUserData }  from '../database.js'
import { myData }  from '../database.js'

export default {
  name: 'SettingsView',
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
  <v-container fluid class="pa-0 ma-0" style="background-color:#c2c2c2;height:100%">
    <router-link to="/" class="pa-0 ma-0"><div class="arrowback"></div></router-link>
      <v-row class="text-center pa-0 ma-0">
        <nav style="justify-content:center; margin: 0 auto;">
          <button @click="handleSignOut" v-if="isLoggedIn">Kliknij aby się wylogować</button>
        </nav>
      </v-row>
  </v-container>
</template>

<style>
.arrowback{
    position: absolute;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url("../assets/arrowback.png");
    height: 60px;
    width: 60px;
    top:8px;
    left: 2px;
}
.arrowback:hover{
  transform: scale(1.12);
  transition: 0.4s;
}
.logout_button{
    margin-top: 10px;
    margin-left: 5px;
    width: 100px;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
}
</style>