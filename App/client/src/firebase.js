// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKD0XVqhVByyWH3X0rEl7dTISRtCVzluE",
  authDomain: "travex-bbcc3.firebaseapp.com",
  projectId: "travex-bbcc3",
  storageBucket: "travex-bbcc3.appspot.com",
  messagingSenderId: "14317190494",
  appId: "1:14317190494:web:9968664e5f215b05b863cf",
  measurementId: "G-TV4VGNJZYW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;