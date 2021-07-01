import {firebase} from '@firebase/app';
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyALcupEuXl2g4BDPeu3UDDiZwtw7Bb-0lk",
  authDomain: "curriqlum.firebaseapp.com",
  projectId: "curriqlum",
  storageBucket: "curriqlum.appspot.com",
  messagingSenderId: "307126653172",
  appId: "1:307126653172:web:b21b21d503307b595c8ea1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();