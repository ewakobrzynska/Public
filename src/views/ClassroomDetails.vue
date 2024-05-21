<template>
    <v-card
      class="mx-auto pt-4 text-left"
      max-width="844"
    >
      
      <v-card-text>
        <div class="top">
              <v-btn size="35" icon="mdi-arrow-left" class="arr-btn" @click="goBack"></v-btn>

            <div class="header">
                <p>Katalog sal</p>
                <h1>Szczegóły sali</h1>
            </div>
        </div>

        <hr />

        <div class="details">
          <ul>
            <li> <p><strong>Strefa:</strong> {{ roomDetails.zone }} </p></li>
            <li> <p><strong>Ulica:</strong> {{ roomDetails.street }} </p></li>
            <li> <p><strong>Budynek:</strong> {{ roomDetails.building }} </p></li>
            <li> <p><strong>Jednostka organizacyjna:</strong> {{ roomDetails.organizationalUnit }} </p></li>
            <li> <p><strong>Numer sali:</strong> {{ roomDetails.roomNumber }} </p></li>
            <li> <p><strong>Liczba miejsc:</strong> {{ roomDetails.numberOfPlaces }} </p></li>
          </ul>
        </div>
      </v-card-text>
      
        <v-card-actions>
            <div class="buttons">

                <v-btn 
                  prepend-icon="mdi-calendar"
                  text="Zobacz plan zajęć"
                  variant="text"
                  color="teal-accent-4"
                  @click="goToCalendar"
                ></v-btn>

                <v-btn
                    text="Zgłoś problem"
                    color="red-accent-3"
                    prepend-icon="mdi-pencil"
                    variant="text"
                    @click="reveal = true"
                ></v-btn>

            </div>
        </v-card-actions>
  
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="position-absolute w-100 expand"
          height="100%"
          style="bottom: 0;"
        >
          <v-card-text >
            <h1>Masz jakiś problem?</h1>

            <span>Opisz swój problem, a my zajmiemy się nim natychmiast.</span>
    
          </v-card-text>

          <v-container fluid>
            <v-textarea
            label="Opis problemu"
            name="input-7-1"
            variant="outlined"
            rows="6"
            auto-grow
            ></v-textarea>
        </v-container>
  
          <v-card-actions class="form-actions">

            <div class="buttons">
                <v-btn 
                    prepend-icon="mdi-checkbox-marked-circle"
                    text="Wyślij"
                    variant="text"
                    color="teal-accent-4"
                ></v-btn>
                
                <v-btn
                    prepend-icon="mdi-cancel"
                    color="red-accent-3"
                    text="Anuluj"
                    variant="text"
                    @click="reveal = false"
                ></v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </template>
  
  <script>
    import { retrieveRoomData } from "../../data/database.js";

    export default {
      data: () => ({
        roomDetails: {},
        reveal: false,
      }),

      methods: {
        goToCalendar() {
          console.log(this.roomDetails.roomNumber);
          this.$router.push({ path: `/calendar/${this.roomDetails.roomNumber}` });
        },

        goBack() {
          this.$router.push({ path: '/classroom' });
        }
      },

      async mounted() {
        try {
          const roomNumber = this.$route.params.roomNumber;

          const data = await retrieveRoomData(roomNumber)
          this.roomDetails = data

        } catch (error) {
          console.error('Error fetching room details:', error);
        }
      }
    }

  </script>
  

  <style scoped>

    .text-left {
        text-align: left;
        margin-top: 9rem !important;
        background-color: rgba(245, 245, 245, 0.332);
    }

    .header {
        text-align: center;
    }

    .arr-btn {
        position: absolute;
        left: 1rem;
        top: 1rem;
    }
    
    .pt-4 {
        margin-top: 6rem;
    }

    p {
        line-height: 2.8rem !important;
        font-size: 1.1rem;
    }

    .details {
        padding: 0 2rem;
    }

    h1, h2 {
        padding: 0.4rem 0;
    }

    .ul-details {
      line-height: 2.6rem !important;
    }

    hr {
        margin-bottom: 0.6rem;
    }

    .buttons {
        display: flex;
        margin: 1rem;
        justify-content: center;
        gap: 10%;
        width: 100%;
    }

    span {
        display: inline-block;
        margin: 1rem;
        font-size: 1.1rem;
        font-style: italic;
        color: rgba(0, 0, 0, 0.545);
    }

    .expand {
        padding: 2rem;
        text-align: center;
    }

  </style>
  