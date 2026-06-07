import React, { useState, useEffect, useRef } from 'react';

export default function Navbar({ currentTab, setCurrentTab }) {
  // 記錄目前哪一個牧區的下拉選單是被點開的 ('adult', 'youth', 'children', 或 null)
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  // 處理導覽列主分頁點擊（首頁）
  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    setActiveDropdown(null); // 切換主頁時關閉所有下拉選單
  };

  // 處理牧區按鈕點擊：如果點擊已打開的就關閉，沒打開的就打開
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  // 處理子選單點擊
  const handleSubTabClick = (subTabName) => {
    setCurrentTab(subTabName);
    setActiveDropdown(null); // 點選功能後自動把選單收起來
  };

  // 當使用者點擊網頁其他空白處時，自動把下拉選單收起來
  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 【核心修正】判斷該牧區按鈕是否該亮粉紅色底色
  // 條件：目前畫面顯示該牧區 (currentTab 吻合) OR 目前使用者正點開該牧區的下拉選單 (activeDropdown 吻合)
  const isCategoryActive = (prefix) => {
    return currentTab.startsWith(prefix) || activeDropdown === prefix;
  };

  return (
    <header className="bg-[#F4D03F] shadow-md sticky top-0 z-50 px-6 py-3 select-none" ref={navbarRef}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* 左側 Logo 與標題 */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
          {/* 自動讀取 public/church-logo.png, 如果沒有就顯示備用教堂圖示 */}
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-amber-200">
            <img 
              src="/church-logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <span className="font-black text-[#E6007E] text-base hidden">⛪</span>
          </div>
          <h1 className="text-lg font-black text-slate-800 tracking-wider">
            台中行道會教會系統
          </h1>
        </div>

        {/* 中央主選單 */}
        <nav className="flex items-center space-x-2 font-bold text-xs">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'home' ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
            }`}
          >
            首頁
          </button>

          {/* 1. 成人牧區 */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('adult')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1 ${
                isCategoryActive('adult') ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
              }`}
            >
              <span>成人牧區 ▼</span>
            </button>
            {activeDropdown === 'adult' && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn z-50">
                <button onClick={() => handleSubTabClick('adult-info')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">📋</span> 聚會資訊</button>
                <button onClick={() => handleSubTabClick('adult-members')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">👥</span> 會友名單</button>
                <button onClick={() => handleSubTabClick('adult-schedule')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">📅</span> 服事表</button>
              </div>
            )}
          </div>

          {/* 2. 青年牧區 */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('youth')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1 ${
                isCategoryActive('youth') ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
              }`}
            >
              <span>青年牧區 ▼</span>
            </button>
            {activeDropdown === 'youth' && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn z-50">
                <button onClick={() => handleSubTabClick('youth-info')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">⚡</span> 聚會資訊</button>
                <button onClick={() => handleSubTabClick('youth-members')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">👥</span> 會友名單</button>
                <button onClick={() => handleSubTabClick('youth-schedule')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">📅</span> 服事表</button>
              </div>
            )}
          </div>

          {/* 3. 兒童牧區 */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('children')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1 ${
                isCategoryActive('children') ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
              }`}
            >
              <span>兒童牧區 ▼</span>
            </button>
            {activeDropdown === 'children' && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn z-50">
                <button onClick={() => handleSubTabClick('children-info')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">🎈</span> 聚會資訊</button>
                <button onClick={() => handleSubTabClick('children-members')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">👥</span> 會友名單</button>
                <button onClick={() => handleSubTabClick('children-schedule')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">📅</span> 服事表</button>
              </div>
            )}
          </div>
        </nav>

        {/* 右側通知與管理者圖標 */}
        <div className="flex items-center space-x-4">
          <button className="text-slate-700 hover:text-[#E6007E] transition-colors relative">
            🔔
          </button>
          <div className="flex items-center space-x-2 bg-slate-900 text-white px-3 py-1.5 rounded-full shadow-sm border border-slate-800">
            <div className="w-5 h-5 bg-[#E6007E] text-white rounded-full flex items-center justify-center text-[10px] font-black">
              陳
            </div>
            <span className="text-[10px] font-bold tracking-wider text-amber-300">管理者</span>
          </div>
        </div>

      </div>
    </header>
  );
}
