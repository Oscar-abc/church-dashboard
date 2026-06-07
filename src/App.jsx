import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  const [currentTab, setCurrentTab] = useState('home');

  // 根據完整的 Tab ID (包含子項目) 決定渲染畫面
  const renderContent = () => {
    // 處理成人牧區
    if (currentTab.startsWith('adult')) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">
          🌳 【成人牧區】 ❯ {
            currentTab === 'adult-info' ? '聚會資訊' :
            currentTab === 'adult-members' ? '會友名單' : '服事表'
          } 面板開發中...
        </div>
      );
    }
    
    // 處理青年牧區
    if (currentTab.startsWith('youth')) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">
          ⚡ 【青年牧區】 ❯ {
            currentTab === 'youth-info' ? '聚會資訊' :
            currentTab === 'youth-members' ? '會友名單' : '服事表'
          } 面板開發中...
        </div>
      );
    }

    // 處理兒童牧區
    if (currentTab.startsWith('children')) {
      return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">
          🎈 【兒童牧區】 ❯ {
            currentTab === 'children-info' ? '聚會資訊' :
            currentTab === 'children-members' ? '會友名單' : '服事表'
          } 面板開發中...
        </div>
      );
    }

    // 預設首頁
    return <Dashboard />;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F0] text-gray-800 font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="max-w-[1400px] mx-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
