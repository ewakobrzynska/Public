<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-account" title="Dokończ rezerwację">
        <v-card-text>
          <v-row dense>

            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Imię*" v-model="firstName" required></v-text-field>
            </v-col>

            <v-col cols="12" md="6" sm="6">
              <v-text-field label="Nazwisko*" v-model="lastName" required></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4" sm="6">
              <v-text-field label="Email*" v-model="email" required></v-text-field>
            </v-col> -->

            <v-col cols="12" sm="12">
              <v-text-field hint="rezerwacja będzie nosić nazwę podaną w tym polu" label="Prowadzony kurs*" v-model="course" required></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*pole wymagane</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Zamknij" variant="plain" @click="$emit('changeDialogValue', false)"></v-btn>

          <v-btn color="primary" text="Gotowe" variant="tonal" @click="submitForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue';
import { getDatabase, ref as dbRef, push } from "firebase/database";
import emailjs from 'emailjs-com';

const apiKey  = '8GjRBTArYojMBsJkC';
const serviceID = 'service_9b8vyny';
const templateID = 'template_c6bm709'; 

const emit = defineEmits(['formSubmitted']);

const props = defineProps({
  childProp: Boolean
});

const dialog = ref(props.childProp);

watch(() => props.childProp, (newValue) => {
  dialog.value = newValue;
});

const firstName = ref('');
const lastName = ref('');
const course = ref('');
const roomNumber = ref('');
const date = ref('');
const start = ref('');
const finish = ref('');

const submitForm = async () => {
  if (!firstName.value || !lastName.value || !course.value) {
    alert("Wypełnij wszystkie pola.");
    return; 
  }

  console.log('Submitting form...');
  console.log('First Name:', firstName.value);
  console.log('Last Name:', lastName.value);
  console.log('Course:', course.value);

  const formData = {
    date: date.value,
    finish: finish.value,
    name: course.value,
    person: firstName.value + " " + lastName.value,
    roomNumber: roomNumber.value,
    start: start.value,
    status: 'IMPORTED'
    //timestamp: new Date().toISOString()
  };

  emit('formSubmitted', formData);

  try {
   
    const db = getDatabase();
    const scheduleRef = dbRef(db, 'schedule');
    await push(scheduleRef, formData);
    console.log("Rezerwacja dodana do tabeli schedule.");

    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const emailParams = {
      firstName: firstName.value,
      lastName: lastName.value,
      course: course.value,
      timestamp: formattedDate 
    };

    emailjs.send(serviceID, templateID, emailParams, apiKey )
      .then((response) => {
        console.log('E-mail wysłany pomyślnie', response.status, response.text);
      })
      .catch((error) => {
        console.error('Błąd przy wysyłaniu e-maila:', error);
      });

  } catch (error) {
    console.error("Błąd podczas dodawania rezerwacji do bazy danych:", error);
  }

  dialog.value = false;
};
</script>


