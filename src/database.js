import { getDatabase, ref, set, /*update*/ onValue } from "firebase/database";

const db = getDatabase();

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