// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBah5wqc4_JCJaxp5B9hh6kkdep-xuMmvA",
  authDomain: "teaching-project-a8687.firebaseapp.com",
  projectId: "teaching-project-a8687",
  storageBucket: "teaching-project-a8687.appspot.com",
  messagingSenderId: "407923473378",
  appId: "1:407923473378:web:7302d148ad8642d48817bb",
  measurementId: "G-50VSJY8P33"
};



firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const auth = firebase.auth();


