import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbjr_tJOAcE85rptZoh13ySNKs2F4uOcw",
  authDomain: "rezerwacja-9c6a5.firebaseapp.com",
  projectId: "rezerwacja-9c6a5",
  storageBucket: "rezerwacja-9c6a5.appspot.com",
  messagingSenderId: "277624196973",
  appId: "1:277624196973:web:cbbdbff86145ccd20c1464",
  measurementId: "G-926RKMC5BL"
};

initializeApp(firebaseConfig);

loadFonts()
createApp(App)
  .use(router).use(vuetify)
  .mount('#app')


