import React from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

function Dashboard({
  initialEvents = [],
  loading,
  handleDeleteEvent
}) {

  // Firebase 寫入函數 (獨立定義)
  const saveMemberToFirebase = async (memberData) => {
    try {
      const docRef = await addDoc(collection(db, "members"), memberData);
      console.log("資料已成功寫入，ID:", docRef.id);
      alert("儲存成功！");
    } catch (e) {
      console.error("寫入資料庫時發生錯誤: ", e);
      alert("儲存失敗，請查看控制台");
    }
  };

  // 安全熔斷鎖
  const safeEvents = initialEvents || [];

  // 1. 本週主日服事輪值表數據
  const sundayService = {
    speaker: '張茂松 牧師',
    leader: '陳冠宏 門徒',
    pianist: '林美惠 姊妹',
    audio: '李明翰 兄弟',
    usher: '王淑芬 姊妹'
  };

  // 2. 近期重要事工倒數數據
  const incomingEvents = [
    { name: '親密之旅關係培訓班', date: '2026/06/20', daysLeft: 13 },
    { name: '門徒造就 啟航班', date: '2026/07/05', daysLeft: 28 }
  ];

  // 3. 今日緊急代禱事項
  const prayers = [
    { id: 1, tag: '緊急代禱', time: '2小時前', group: '大衛小組', content: '為...' },
    { id: 2, tag: '事工代禱', time: '今天上午', group: '喜樂小組', content: '為...' }
  ];

  // 4. 三大牧區出席波動趨勢
  const attendanceTrends = [
    { week: 'W1 (上上上週)', adult: 210, youth: 85, children: 45 },
    { week: 'W2 (上上週)', adult: 225, youth: 92, children: 42 },
    { week: 'W3 (上週)', adult: 198, youth: 78, children: 48 },
    { week: 'W4 (本週主日)', adult: 220, youth: 95, children: 50 }
  ];

return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">教會儀表板</h1>

      {/* --- 在這裡補上您原本的表格與卡片結構 --- */}
      {/* 例如：這邊要放顯示 sundayService 的表格 */}
      {/* 以及顯示 attendanceTrends 的圖表區塊 */}
      
      {/* 2. 插入 Firebase 呼叫按鈕 */}
      <button 
        onClick={() => saveMemberToFirebase({ name: '測試會友', date: new Date() })}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        匯出健康警訊報表
      </button>
    </div>
  );}

export default Dashboard;
