
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ZUYSyByFlmc7aRJbxHf5-ZvrsbRTnmk",
  authDomain: "resume-builder-84e71.firebaseapp.com",
  projectId: "resume-builder-84e71",
  storageBucket: "resume-builder-84e71.firebasestorage.app",
  messagingSenderId: "928554288078",
  appId: "1:928554288078:web:6815b6e9fa3f579729219f",
  measurementId: "G-4DYVJ7R0TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);