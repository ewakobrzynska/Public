import { getDatabase, ref, set, onValue, update, push } from "firebase/database";
import roomsFile from "./rooms.json";
import detailsFile from "./details.json";
import scheduleFile from "./schedule.json";

const db = getDatabase();

// Importowanie danych z plików JSON (zakładając, że roomsFile, detailsFile, scheduleFile są zdefiniowane)
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

export function getAllReservations() {
  return new Promise((resolve, reject) => {
    const scheduleRef = ref(db, 'schedule');
    onValue(scheduleRef, (snapshot) => {
      const scheduleData = snapshot.val();
      resolve(scheduleData);
    }, (error) => {
      reject(error);
    });
  });
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
  });
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

export async function updateReservationStatus(reservationId, status) {
  const reservationRef = ref(db, `newreservations/${reservationId}`);
  update(reservationRef, { status: status })
    .then(() => {
      console.log('Status updated successfully');
    })
    .catch(error => {
      console.error('Error updating status:', error);
    });
}

export async function addReservation(reservation) {
  try {
    const lastIndex = await getNewReservationsLastIndex();
    const newIndex = lastIndex !== null ? lastIndex + 1 : 0;
    await set(ref(db, `newreservations/${newIndex}`), {
      ...reservation,
      id: newIndex
    });
    console.log("Reservation added successfully");
  } catch (error) {
    console.error("Error while adding reservation:", error);
    throw error;
  }
}

function isPastDate(dateString) {
  const currentDate = new Date();
  const date = new Date(dateString);
  return date < currentDate;
}

export function reportIssue(roomNumber, userEmail, description) {
  const issuesRef = ref(db, 'issues')

  const report = {
    roomNumber: roomNumber,
    userEmail: userEmail,
    description: description,
    data: getCurrentDate()
  };

  push(issuesRef, report)
    .then(() => {
        console.log("Report sent succesfully.");
        return 1
    })
    .catch((error) => {
        console.error("Error while sending a report: ", error);
        return 0
    });
}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toISOString().slice(0, 10);
}

export function retrieveIssues() {
  return new Promise((resolve, reject) => {
    const issuesRef = ref(db, 'issues')

    onValue(issuesRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
    });

  })
}
