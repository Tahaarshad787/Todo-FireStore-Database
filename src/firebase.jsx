import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDosuKzF_7Dt0F5-fXNBS9zS9Q1zgQoNBs",
  authDomain: "todofirestore12.firebaseapp.com",
  projectId: "todofirestore12",
  storageBucket: "todofirestore12.appspot.com",
  messagingSenderId: "659086031138",
  appId: "1:659086031138:web:d3748df8c8969efd060d7b"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);

export { db };
