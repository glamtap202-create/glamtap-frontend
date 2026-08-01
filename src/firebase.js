import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4trBh3Bnz-fnVPmHueOIfyGa_T27bek",
  authDomain: "glamtap-125ab.firebaseapp.com",
  projectId: "glamtap-125ab",
  storageBucket: "glamtap-125ab.firebasestorage.app",
  messagingSenderId: "563794752639",
  appId: "1:563794752639:web:988dc40adfbdb5fe3ebb4a",
  measurementId: "G-7C9KDEM264",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
