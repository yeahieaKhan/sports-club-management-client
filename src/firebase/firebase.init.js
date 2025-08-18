// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc6pwuJjSf1LIrO1402Bs_j16xnaRdOZs",
  authDomain: "sports-club-management-b64e1.firebaseapp.com",
  projectId: "sports-club-management-b64e1",
  storageBucket: "sports-club-management-b64e1.firebasestorage.app",
  messagingSenderId: "858495724205",
  appId: "1:858495724205:web:a67ac10ce36e39d9a1b424",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
