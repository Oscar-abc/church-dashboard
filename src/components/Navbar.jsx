import churchLogo from '../assets/church-logo.png';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar({ currentTab, setCurrentTab }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
    setActiveDropdown(null); 
  };

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const handleSubTabClick = (subTabName) => {
    setCurrentTab(subTabName);
    setActiveDropdown(null); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCategoryActive = (prefix) => {
    if (activeDropdown !== null) {
      return activeDropdown === prefix;
    }
    return currentTab.startsWith(prefix);
  };

  return (
    <header className="bg-[#F4D03F] shadow-md sticky top-0 z-50 px-6 py-3 select-none" ref={navbarRef}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
{/* 左側 Logo 與 標題 */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('home')}>
        <img src={churchLogo} alt="Logo" className="h-10 w-10 object-contain rounded-md" />
        <h1 className="text-xl font-bold text-slate-800 tracking-wide">台中行道會教會系統</h1>
      </div>

        {/* 中央主選單（包含新功能：行事曆） */}
        <nav className="flex items-center space-x-2 font-bold text-xs">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentTab === 'home' && activeDropdown === null ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
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
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
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
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
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
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <button onClick={() => handleSubTabClick('children-info')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">🎈</span> 聚會資訊</button>
                <button onClick={() => handleSubTabClick('children-members')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">👥</span> 會友名單</button>
                <button onClick={() => handleSubTabClick('children-schedule')} className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-slate-900 transition-colors flex items-center"><span className="mr-2">📅</span> 服事表</button>
              </div>
            )}
          </div>

          {/* 📅 行事曆按鈕 (精準落在截圖紅框位置) */}
          <button
            onClick={() => handleTabClick('calendar')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1 ${
              currentTab === 'calendar' && activeDropdown === null ? 'bg-[#E6007E] text-white shadow-sm' : 'text-slate-700 hover:bg-amber-400/50'
            }`}
          >
            <span>📅 行事曆</span>
          </button>
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
