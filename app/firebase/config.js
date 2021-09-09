// Import the functions you need from the SDKs you need
import "@firebase/auth";
import "@firebase/firestore";
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMrcSMYzME2SOf0uzKveztep6lG5VcmCk",
  authDomain: "getitdone-eca24.firebaseapp.com",
  databaseURL: "https://getitdone-eca24-default-rtdb.firebaseio.com",
  projectId: "getitdone-eca24",
  storageBucket: "getitdone-eca24.appspot.com",
  messagingSenderId: "883727250077",
  appId: "1:883727250077:web:1945b6d3666961684b9a74",
  measurementId: "G-ZHDMQCHJK6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
