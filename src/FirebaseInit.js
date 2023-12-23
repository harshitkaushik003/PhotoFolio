// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIgvCzy-mkXP9LT7I5c0izpC0X2LgcRcs",
  authDomain: "photofolio-275d3.firebaseapp.com",
  projectId: "photofolio-275d3",
  storageBucket: "photofolio-275d3.appspot.com",
  messagingSenderId: "355906345838",
  appId: "1:355906345838:web:5060ecc0a1e3bbeaf03f7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
