// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_KN8DoPXLtoAuy43iE-cPMI4a6BJq2sg",
  authDomain: "smile-ngo-40769.firebaseapp.com",
  projectId: "smile-ngo-40769",
  storageBucket: "smile-ngo-40769.firebasestorage.app",
  messagingSenderId: "178660385908",
  appId: "1:178660385908:web:01c584a439826d6e4ddd21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);