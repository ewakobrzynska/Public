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

var data = {}
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
export function retrieveRoomData(roomIndex){
  const roomRef = ref(db, `rooms/${roomIndex}`);
  onValue(roomRef, (snapshot) => {
    const roomData = snapshot.val();
    console.log(roomData);
  });
}

retrieveRoomData(11);

//Jezeli chcecie uzyc powyzsej metody z dowolnego miejsca kodu to wystarczy ja zaimportowac wklejajac kod ponizej
//import { retrieveRoomData } from "./nazwaTwojegoModulu";
