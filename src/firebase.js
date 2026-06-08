import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx...", // 你的雲端 API Key
  authDomain: "church-dashboard-oscar.firebaseapp.com",
  projectId: "church-dashboard-oscar", // 👈 這行一定要完全對準你的 Firebase 專案 ID
  storageBucket: "church-dashboard-oscar.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // 匯出通道
