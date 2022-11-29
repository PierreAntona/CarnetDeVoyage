import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCARkOwpZaQDekaYdBWG1H5GQjn780KsTg",
  authDomain: "carnetdevoyage-6fd40.firebaseapp.com",
  projectId: "carnetdevoyage-6fd40",
  storageBucket: "carnetdevoyage-6fd40.appspot.com",
  messagingSenderId: "755110185127",
  appId: "1:755110185127:web:56581af634fd0a194e3382",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

export { app, db };
