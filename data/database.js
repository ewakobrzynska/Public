import { getDatabase, ref, set, /*update*/ onValue } from "firebase/database";
import * as roomsFile from "./rooms.json";
import * as detailsFile from "./details.json";
import * as scheduleFile from "./schedule.json";

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

// export function writeUserScore(userId, numbersScore){
//     const reference = ref(db, 'users/' + userId);
  
//     update(reference, {
//       score: score,
//     });
// }

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