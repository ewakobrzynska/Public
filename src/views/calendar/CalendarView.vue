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

        // handleClosingDialog(data) {
        //     this.parentState = data
        //     console.log(this.parentState)
        // },

        handleSubmition(args) {
            console.log(args)
            this.formData = args
            this.updateDialogState()
            this.performAddEvent(this.tmpArg)
        },

        loadEvents(events) {
            const numberOfEvents = events.length

            // console.log(events[0])
            
            const calendarApi = this.$refs.calendarRef.getApi();
            // let calendarApi = events[0].view.calendar

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
            const events = getEvents("A-0-11");
            
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
    <div class="demo-app">
        <header>
            <h2>Plan zajęć odbywających się w sali A-0-11</h2>
            <h3>III Kampus, budynek Wydziału Fizyki, Astronomii i Informatyki Stosowanej (Loj11)</h3>
        </header>

        <div>
            <FullCalendar :options="calendarOptions" ref="calendarRef"/>
        </div>

        <!-- <button @click="updateDialogState">Update State</button> -->
        <DialogModal :childProp="parentState" v-on:changeDialogValue="updateDialogState" v-on:form-submitted="handleSubmition"/>
        
    </div>
  
  </template>

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
    /* font-size: 14px; */
    }

    .demo-app-main {
        flex-grow: 1;
        padding: 3em;
    }

    .fc { /* the calendar root */
        max-width: 1100px;
        margin: 0 auto;
    }

</style>