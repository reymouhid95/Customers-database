// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqvhykFOs084RBMMVczd4y2WL80szauKY",
  authDomain: "crud-reactjs-d48ef.firebaseapp.com",
  projectId: "crud-reactjs-d48ef",
  storageBucket: "crud-reactjs-d48ef.appspot.com",
  messagingSenderId: "924059253901",
  appId: "1:924059253901:web:f89ed943def14f1ad8b6c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
