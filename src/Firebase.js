import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDXovtSC8ctIpuwmAtxdRFxqmsBR0rqJRg",
  authDomain: "portfolio-project-79fc7.firebaseapp.com",
  projectId: "portfolio-project-79fc7",
  storageBucket: "portfolio-project-79fc7.appspot.com",
  messagingSenderId: "334661913010",
  appId: "1:334661913010:web:dd8c8178a06b403159fcab"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getFirestore();
export { db };

