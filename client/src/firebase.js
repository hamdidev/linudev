// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "linudevblog.firebaseapp.com",
  projectId: "linudevblog",
  storageBucket: "linudevblog.appspot.com",
  messagingSenderId: "504768238789",
  appId: "1:504768238789:web:6c24e95e51215399d60cac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
