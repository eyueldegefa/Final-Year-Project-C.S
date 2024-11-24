// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Optional, for database

const firebaseConfig = {
    apiKey: "AIzaSyBddHl01tO4gvvAqzJ2GTDRaQncl_XbzPs",
    authDomain: "ethiopianrailways-8197e.firebaseapp.com",
    projectId: "ethiopianrailways-8197e",
    storageBucket: "ethiopianrailways-8197e.firebasestorage.app",
    messagingSenderId: "338382103974",
    appId: "1:338382103974:web:e543c0a5939c388bc59b67",
    measurementId: "G-3BDK2WY4VF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // For authentication
export const db = getFirestore(app); // For Firestore (if needed)
