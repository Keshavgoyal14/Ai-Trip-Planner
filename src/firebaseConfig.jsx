// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuQ4yuN42QgG_T51k-qzi8CGWs7lFUWuY",
  authDomain: "ai-trip-planner-66adf.firebaseapp.com",
  projectId: "ai-trip-planner-66adf",
  storageBucket: "ai-trip-planner-66adf.firebasestorage.app",
  messagingSenderId: "674006582395",
  appId: "1:674006582395:web:6886e9df35378f2feecede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };