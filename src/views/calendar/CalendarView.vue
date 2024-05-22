<script>

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DialogModal from './DialogModal.vue'
import { ref } from 'vue'
import { getEvents } from '../../../data/calendarEvents'


export default {
    components: {
        FullCalendar,
        DialogModal
    },

    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
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
            tmpArg: {}

        }
    },

    methods: {
        handleDateClick: function(arg) {
            if (arg.view['type'] == 'dayGridMonth') {
                let calendarApi = arg.view.calendar
                calendarApi.changeView('timeGridDay', arg.dateStr);
            }
        },

        createEventId() {
            return "id" + Math.random().toString(16).slice(2)
        },

        handleDateSelect(arg) {
            if (arg.view['type'] == 'dayGridMonth') {
                return
            }
            this.updateDialogState()
            this.tmpArg = arg

        },

        performAddEvent(arg) {
            const calendarApi = this.$refs.calendarRef.getApi();

            calendarApi.unselect() 

            const title = `${this.formData.course} - ${this.formData.firstName} ${this.formData.lastName}`;

            calendarApi.addEvent({
                id: this.createEventId(),
                title: title,
                start: arg.startStr,
                end: arg.endStr,
                allDay: arg.allDay
            })

        },

        handleEvents(events) {
            this.currentEvents = events
        },

        updateDialogState() {
            this.parentState = !this.parentState;
            console.log(this.parentState)
        },

        handleSubmition(args) {
            console.log(args)
            this.formData = args
            this.updateDialogState()
            this.performAddEvent(this.tmpArg)
        },

        loadEvents(events) {
            const numberOfEvents = events.length
            
            const calendarApi = this.$refs.calendarRef.getApi();

            for (let i = 0; i < numberOfEvents; i++) {
                const title = `${events[i].title} - ${events[i].person}`;
                calendarApi.addEvent({
                    id: this.createEventId(),
                    title: title,
                    start: events[i].startStr,
                    end: events[i].endStr,
                    allDay: events[i].allDay
                });
            }
        }
    },

    async mounted() {
        try {
            const roomNumber = this.$route.params.roomNumber;

            const events = getEvents(roomNumber);
            
            if (events instanceof Promise) {
                const resolvedEvents = await events;
                this.loadEvents(resolvedEvents)
                console.log("Todo", resolvedEvents);
            } else {
                console.log("Todo", events);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
}
</script>


<template>
<div class="d-flex justify-content-between align-items-center py-4 bg-light border-bottom mb-4">
        <div class="container d-flex justify-content-between">
          <h1 v-if="isHomePage">System Rezerwacji</h1>
          <h2>Plan zajęć: sala {{ $route.params.roomNumber }} III Kampus, budynek Wydziału Fizyki, Astronomii i Informatyki Stosowanej (Loj11)</h2>
        </div>
    </div>
    <div class="header">
        <div>
            <FullCalendar :options="calendarOptions" ref="calendarRef"/>
        </div>

        <DialogModal :childProp="parentState" v-on:changeDialogValue="updateDialogState" v-on:form-submitted="handleSubmition"/>
        
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
@import '@/css/bootstrap.min.css';


    header {
        padding-bottom: 4rem;
        padding-top: 3rem;
        text-align: left;
        max-width: 1100px;
        margin: 0 auto;
    }

    b {
        margin-right: 3px;
    }

    .header {
        min-height: 100%;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    }

    .fc {
        max-width: 1100px;
        margin: 0 auto;
    }

</style>