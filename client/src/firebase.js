// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGEMNofrqjTf438kJMGcgWzj7CAi1QN9k",
  authDomain: "mern-blog-453ae.firebaseapp.com",
  projectId: "mern-blog-453ae",
  storageBucket: "mern-blog-453ae.appspot.com",
  messagingSenderId: "366551872517",
  appId: "1:366551872517:web:8db92c5fb13eb00b1c986c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);