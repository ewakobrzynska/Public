import { getDatabase, ref, set, onValue } from "firebase/database";
import roomsFile from "./rooms.json";
import detailsFile from "./details.json";
import scheduleFile from "./schedule.json";

const db = getDatabase();

function importDataFromFiles() {
  set(ref(db, 'rooms'), roomsFile);
  set(ref(db, 'details'), detailsFile);
  set(ref(db, 'schedule'), scheduleFile);
}

export function writeUserData(userId, email, firstname, lastname){
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    firstname : firstname,
    lastname : lastname,
    email : email,
  });
}

let data = {};
importDataFromFiles()

export function retriveUserData(userId){
  const distanceRef = ref(db, 'users/' + userId);
  onValue(distanceRef, (snapshot) => {
    data = snapshot.val();
    console.log(data);
    myData(data);
  });
}

export function myData(data){
    return data;
}


//Przykladowa funkcja do uzyskania sali o indeksie 11
export function retrieveRoomData(roomIndex) {
  return new Promise((resolve, reject) => {
    const roomRef = ref(db, `details/${roomIndex}`);
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      resolve(roomData);
    }, (error) => {
      reject(error);
    });
  });
}

//retrieveRoomData(11);

export function getAllReservations() {
  return new Promise((resolve, reject) => {
    const scheduleRef = ref(db, 'schedule');
    onValue(scheduleRef, (snapshot) => {
      const scheduleData = snapshot.val();
      resolve(scheduleData);
    }, (error) => {
      reject(error);
    });
  })
}

export function getNewReservations() {
  return new Promise((resolve, reject) => {
    const scheduleRef = ref(db, 'newreservations');
    onValue(scheduleRef, (snapshot) => {
      const scheduleData = snapshot.val();
      resolve(scheduleData);
    }, (error) => {
      reject(error);
    });
  })
}

export function getNewReservationsLastIndex() {
  return new Promise((resolve, reject) => {
    const scheduleRef = ref(db, 'newreservations');
    onValue(scheduleRef, (snapshot) => {
      const scheduleData = snapshot.val();
      if (scheduleData) {
        const indices = Object.keys(scheduleData).map(index => parseInt(index, 10));
        const lastIndex = Math.max(...indices);
        resolve(lastIndex);
      } else {
        resolve(null);
      }
    }, (error) => {
      reject(error);
    });
  });
}

export function getHistoryReservations() {
  return new Promise((resolve, reject) => {
    const scheduleRef = ref(db, 'newreservations');
    onValue(scheduleRef, (snapshot) => {
      const scheduleData = snapshot.val();

      if (!scheduleData) {
        resolve({});
        return;
      }

      const filteredData = Object.keys(scheduleData)
        .filter(key => !isPastDate(scheduleData[key].date))
        .reduce((obj, key) => {
          obj[key] = scheduleData[key];
          return obj;
        }, {});

      console.log('Przefiltrowane dane:', filteredData);
      resolve(filteredData);
    }, (error) => {
      reject(error);
    });
  });
}

export function retrieveRoomDescription(roomNumber) {
  return new Promise((resolve, reject) => {
    const descriptionRef = ref(db, `opissal/${roomNumber}`);
    onValue(descriptionRef, (snapshot) => {
      const descriptionData = snapshot.val();
      resolve(descriptionData ? descriptionData.description : null);
    }, (error) => {
      reject(error);
    });
  });
}

function isPastDate(dateString) {
  const currentDate = new Date();
  const date = new Date(dateString);
  return date < currentDate;
}
