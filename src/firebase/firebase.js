// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDbRqhrhDty_j8_irVsjobVplBC72Ei2Mg",
  authDomain: "customize-pro.firebaseapp.com",
  projectId: "customize-pro",
  storageBucket: "customize-pro.appspot.com",
  messagingSenderId: "572153820669",
  appId: "1:572153820669:web:8d58edf89215c08e35d594",
  measurementId: "G-1WHKW9JKTJ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
