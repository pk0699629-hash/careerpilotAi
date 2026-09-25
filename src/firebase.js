import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbYp-Teqjk2yaACLAXTVLYciXkX0v3V5w",
  authDomain: "careerpilotai-5b0e4.firebaseapp.com",
  projectId: "careerpilotai-5b0e4",
  storageBucket: "careerpilotai-5b0e4.firebasestorage.app",
  messagingSenderId: "1015270921890",
  appId: "1:1015270921890:web:e984221893000f71a9a9fb",
  measurementId: "G-DEM7918PC6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);