// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMUuHNCsIYbNBmxLlBbMCza9j0uwC5Jm0",
    authDomain: "ethiopian-railways-af181.firebaseapp.com",
    projectId: "ethiopian-railways-af181",
    storageBucket: "ethiopian-railways-af181.firebasestorage.app",
    messagingSenderId: "492494305372",
    appId: "1:492494305372:web:4081aad19cde491810ce99",
    measurementId: "G-6RM5RYB9KK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const googleProvider = GoogleAuthProvider();
