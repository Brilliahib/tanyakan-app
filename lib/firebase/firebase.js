import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPTTFcgNc5DSM5QrzO1wE5UNzwDmoYY-A",
  authDomain: "tanyakan-app.firebaseapp.com",
  projectId: "tanyakan-app",
  storageBucket: "tanyakan-app.appspot.com",
  messagingSenderId: "1070697029819",
  appId: "1:1070697029819:web:9f4b6e4b08b85b5ba0c99e",
  measurementId: "G-EZZ2ZDPSC9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
