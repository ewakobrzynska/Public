<template>
  <div>
    <h1>Katalog Sal</h1>
    <table class="classroom-table">
      <thead>
        <tr>
          <th>Strefa</th>
          <th>Ulica</th>
          <th>Budynek</th>
          <th>Jednostka organizacyjna</th>
          <th>Numer sali</th>
          <th>Liczba miejsc</th>
          <th>Numer telefonu do rezerwacji</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room, index) in rooms" :key="index">
          <td>{{ room.zone }}</td>
          <td>{{ room.street }}</td>
          <td>{{ room.building }}</td>
          <td>{{ room.organizationalUnit }}</td>
          <td>{{ room.roomNumber }}</td>
          <td>{{ room.numberOfPlaces }}</td>
          <td>{{ room.phoneNumberForBookings }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { retrieveRoomData } from "../../data/database.js";

export default {
  name: 'ClassroomView',
  data() {
    return {
      rooms: [],  
    };
  },
  async mounted() {
    try {
      const roomDataPromises = [];
      for (let i = 0; i <= 29; i++) {
        roomDataPromises.push(retrieveRoomData(i));
      }
      const allRoomData = await Promise.all(roomDataPromises);
      this.rooms = allRoomData;
      console.log(allRoomData);
    } catch (error) {
      console.error("Błąd podczas pobierania danych z bazy:", error);
    }
  },
};
</script>

<style scoped>
.classroom-table {
  width: 100%;
  border-collapse: collapse;
}

.classroom-table th,
.classroom-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.classroom-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.classroom-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.classroom-table tr:hover {
  background-color: #ddd;
}
</style>
