import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: 請確認這裡的配置是否與你原本的 Firebase Console 專案金鑰一致
const firebaseConfig = {
  apiKey: "AIzaSyBx...", // 你的 Firebase API Key
  authDomain: "church-dashboard-oscar.firebaseapp.com",
  projectId: "church-dashboard-oscar", // 你的 Firebase 專案 ID
  storageBucket: "church-dashboard-oscar.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出 Firestore 資料庫通道 db 供 App.jsx 使用
export const db = getFirestore(app);
