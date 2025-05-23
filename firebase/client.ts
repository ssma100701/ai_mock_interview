// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaM3dKIlpm1sMBTNEEQdv8EDH9mMsU918",
  authDomain: "prepwise-c851a.firebaseapp.com",
  projectId: "prepwise-c851a",
  storageBucket: "prepwise-c851a.firebasestorage.app",
  messagingSenderId: "128596792463",
  appId: "1:128596792463:web:d01a0ca741e94cb8c68cfa",
  measurementId: "G-MSFT4MKXWT",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
