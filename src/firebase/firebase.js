import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAAvLyEgrG4Z9n3T2MSq0LPWXtEZmEQQWA",
  authDomain: "odoosmartswap.firebaseapp.com",
  projectId: "odoosmartswap",
  storageBucket: "odoosmartswap.firebasestorage.app",
  messagingSenderId: "820822923297",
  appId: "1:820822923297:web:f4d23e74ad2999fd2cab60",
  measurementId: "G-PMK4BS3671"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // for Firebase Storage

export { app, auth, db, storage };
