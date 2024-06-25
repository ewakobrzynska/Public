<template>
  <div class="demo-app">
    <header>
      <h2>Plan zajęć odbywających się w sali {{ $route.params.roomNumber }}</h2>
      <h3>III Kampus, budynek Wydziału Fizyki, Astronomii i Informatyki Stosowanej (Loj11)</h3>
    </header>
    <div>
      <FullCalendar :options="calendarOptions" ref="calendarRef"/>
    </div>
    <DialogModal :childProp="parentState" v-on:changeDialogValue="updateDialogState" v-on:form-submitted="handleSubmition"/>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DialogModal from './DialogModal.vue'
import { ref } from 'vue'
import { getDatabase, ref as dbRef, set} from "firebase/database";
import emailjs from 'emailjs-com';
import { getAllReservations } from '../../../data/database'
import { getNewReservations } from '../../../data/database'
import { getNewReservationsLastIndex } from '../../../data/database'
import { transformReservations } from '../../../data/calendarEvents'

export default {
  components: {
    FullCalendar,
    DialogModal
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: 'Dzisiaj',
          month: 'Miesiąc',
          day: 'Dzień',
          week: 'Tydzień',
        },
        locale: 'pl',
        initialView: 'timeGridWeek',
        weekends: false,
        selectable: true,
        nowIndicator: true,
        slotDuration: "00:15:00",
        slotLabelInterval: "00:15:00",
        selectMirror: true,
        dateClick: this.handleDateClick,
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        allDaySlot: false,
        allDayText: "",
        expandRows: true,
        eventOverlap: false,
        selectOverlap: false,
      },
      currentEvents: [],
      parentState: ref(false),
      formData: {},
      tmpArg: {},
    }
  },
  methods: {
    async performAddEvent(arg) {
      const calendarApi = this.$refs.calendarRef.getApi();
      const roomNumber = this.$route.params.roomNumber.toString();
      calendarApi.unselect();

      const title = `${this.formData.course} - ${this.formData.firstName} ${this.formData.lastName}`;
      const eventId = this.createEventId();
      calendarApi.addEvent({
        id: eventId,
        title: title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay
      });

      console.log('Event to add:', {
        id: eventId,
        title: title,
        start: arg.startStr,
        end: arg.endStr,
        allDay: arg.allDay
      });

      var lastIndex = await getNewReservationsLastIndex();
      lastIndex += 1;
      const db = getDatabase();
      const scheduleRef = dbRef(db, 'newreservations/' + lastIndex );
      set(scheduleRef, {
        id: lastIndex,
        date: arg.startStr.split('T')[0],
        finish: arg.endStr.split('T')[1].substring(0, 5),
        name: this.formData.course,
        person: `${this.formData.firstName} ${this.formData.lastName}`,
        roomNumber: roomNumber,
        start: arg.startStr.split('T')[1].substring(0, 5),
        status: 'PENDING'
      });

      console.log('Data successfully pushed to Firebase');

      const timestamp = new Date();
      const formattedDate = timestamp.toLocaleString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
      const emailParams = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        course: this.formData.course,
        timestamp: formattedDate
      };
      emailjs.send('service_9b8vyny', 'template_c6bm709', emailParams, '8GjRBTArYojMBsJkC')
        .then((response) => {
          console.log('E-mail wysłany pomyślnie', response.status, response.text);
        })
        .catch((error) => {
          console.error('Błąd przy wysyłaniu e-maila:', error);
        });
      
      this.forceRerender();
    },
    handleDateClick(arg) {
      if (arg.view.type === 'dayGridMonth') {
        const calendarApi = arg.view.calendar;
        calendarApi.changeView('timeGridDay', arg.dateStr);
      }
    },
    createEventId() {
      return "id" + Math.random().toString(16).slice(2);
    },
    handleDateSelect(arg) {
      if (arg.view.type === 'dayGridMonth') {
        return;
      }
      this.updateDialogState();
      this.tmpArg = arg;
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    updateDialogState() {
      this.parentState = !this.parentState;
    },
    handleSubmition(args) {
      this.formData = args;
      this.updateDialogState();
      this.performAddEvent(this.tmpArg);
    },
    forceRerender() {
      this.$forceUpdate();
    },
    loadEvents(events) {
      const calendarApi = this.$refs.calendarRef.getApi();
      events.forEach(event => {
        const title = `${event.title} - ${event.person}`;

        if (event.status === 'PENDING') {
            calendarApi.addEvent({
            id: event.id,
            title: 'Rezerwacja oczekująca na zatwierdzenie',
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
            backgroundColor: 'green'
          });
        } else {
          calendarApi.addEvent({
            id: event.id,
            title: title,
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
          });
        }
      });
    }
  },
  async mounted() {
    try {
      const roomNumber = this.$route.params.roomNumber;
      const reservations = await getAllReservations();
      const newReservations = await getNewReservations();
      const allReservations = [...reservations, ...newReservations];
      const filteredEvents = allReservations.filter(reservation => reservation.roomNumber === roomNumber);
      const events = transformReservations(filteredEvents);

      console.log(events)

      if (events && events.length > 0) {
        this.loadEvents(events);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
}
</script>



  <style lang='css'>
  header {
      padding-bottom: 4rem;
      padding-top: 3rem;
      text-align: left;
      max-width: 1100px;
      margin: 0 auto;
  }
  ul {
      margin: 0;
      padding: 0 0 0 1.5em;
  }
  li {
      margin: 1.5em 0;
      padding: 0;
  }
  b {
      margin-right: 3px;
  }
  .demo-app {
      min-height: 100%;
      font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  }
  .demo-app-main {
      flex-grow: 1;
      padding: 3em;
  }
  .fc {
      max-width: 1100px;
      margin: 0 auto;
  }
  </style>
