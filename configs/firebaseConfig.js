// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmmuE5AFb8GOC4daMLa1T9hqbwX45nJB0",
  authDomain: "task-application-71b03.firebaseapp.com",
  projectId: "task-application-71b03",
  storageBucket: "task-application-71b03.firebasestorage.app",
  messagingSenderId: "157326903951",
  appId: "1:157326903951:web:396027d7844e173219befa",
  measurementId: "G-W2W5HJ0SQK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
