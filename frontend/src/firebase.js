// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-pro-c30fb.firebaseapp.com",
  projectId: "mern-pro-c30fb",
  storageBucket: "mern-pro-c30fb.appspot.com",
  messagingSenderId: "51547231816",
  appId: "1:51547231816:web:e91415f5f2422380116a7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);