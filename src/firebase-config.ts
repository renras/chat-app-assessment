// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3yhBsQCteocrk9m5K4R6lfyCJOWmCMLw",
  authDomain: "chat-app-54d89.firebaseapp.com",
  projectId: "chat-app-54d89",
  storageBucket: "chat-app-54d89.appspot.com",
  messagingSenderId: "979225888693",
  appId: "1:979225888693:web:1eeaa661b93c820a90fbfc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
