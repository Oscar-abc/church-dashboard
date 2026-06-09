import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "您的真實API_KEY",
  authDomain: "您的專案ID.firebaseapp.com",
  projectId: "您的專案ID",
  storageBucket: "您的專案ID.appspot.com",
  messagingSenderId: "您的SenderID",
  appId: "您的AppID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
