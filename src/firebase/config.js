import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, db, auth };
