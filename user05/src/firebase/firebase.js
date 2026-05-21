import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBah5wqc4_JCJaxp5B9hh6kkdep-xuMmvA",
  authDomain: "teaching-project-a8687.firebaseapp.com",
  projectId: "teaching-project-a8687",
  storageBucket: "teaching-project-a8687.appspot.com",
  messagingSenderId: "407923473378",
  appId: "1:407923473378:web:7302d148ad8642d48817bb",
  measurementId: "G-50VSJY8P33"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
