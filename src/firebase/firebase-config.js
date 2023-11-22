// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdmusaSx1-DJnlt3B4SnArx0Mydqiv4sI",
  authDomain: "todo-app-e9743.firebaseapp.com",
  projectId: "todo-app-e9743",
  storageBucket: "todo-app-e9743.appspot.com",
  messagingSenderId: "328061537566",
  appId: "1:328061537566:web:ea140fb3aa8395047e8d0f",
  measurementId: "G-4D0TCC7NPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)