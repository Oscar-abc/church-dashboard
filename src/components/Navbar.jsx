import React, { useState } from 'react';

function Navbar({ currentTab, setCurrentTab }) {
  // 記錄目前哪一個牧區的下拉選單正被打開 (null 代表都沒有開)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 定義分頁與下拉選單的內容
  const tabs = [
    { id: 'home', name: '首頁', hasDropdown: false },
    { id: 'adult', name: '成人牧區', hasDropdown: true },
    { id: 'youth', name: '青年牧區', hasDropdown: true },
    { id: 'children', name: '兒童牧區', hasDropdown: true }
  ];

  const dropdownItems = [
    { id: 'info', name: '📋 聚會資訊' },
    { id: 'members', name: '👥 會友名單' },
    { id: 'service', name: '📅 服事表' }
  ];

  // 處理點擊選項的動作
  const handleItemClick = (tabId, itemId) => {
    // 這裡切換主畫面的 Tab ID，例如 'adult-members'
    setCurrentTab(`${tabId}-${itemId}`);
    setActiveDropdown(null); // 點擊後關閉下拉選單
  };

  return (
    <nav className="bg-[#F4D03F] text-[#0B1E2D] px-6 py-3 flex justify-between items-center shadow-md border-b border-amber-400 relative z-50">
      <div className="flex items-center space-x-8">
        
        {/* 左側 Logo 區 */}
        <div className="flex items-center space-x-3 text-lg font-black tracking-wider">
          <img 
            src="/church-logo.png" 
            alt="台中行道會 Logo" 
            className="w-8 h-8 object-contain rounded-md"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span>台中行道會教會系統</span>
        </div>
        
        {/* 中央分頁與下拉選單區 */}
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            // 判斷目前這個 Tab 是否被選中 (包含子項目)
            const isSelected = currentTab.startsWith(tab.id);

            return (
              <div 
                key={tab.id} 
                className="relative"
                onMouseEnter={() => tab.hasDropdown && setActiveDropdown(tab.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* 主按鈕 */}
                <button
                  onClick={() => {
                    if (!tab.hasDropdown) {
                      setCurrentTab(tab.id);
                    } else {
                      // 有選單時，點擊預設切換到第一個子項目「聚會資訊」
                      setCurrentTab(`${tab.id}-info`);
                    }
                  }}
                  className={`px-4 py-2 rounded-md font-bold text-sm transition-all flex items-center space-x-1 ${
                    isSelected
                      ? 'bg-[#E6007E] text-white shadow-sm'
                      : 'text-[#2C3E50] hover:bg-amber-500/40 hover:text-[#0B1E2D]'
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.hasDropdown && <span className="text-[10px] opacity-70">▼</span>}
                </button>

                {/* 下拉選單浮出區塊 */}
                {tab.hasDropdown && activeDropdown === tab.id && (
                  <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-fadeIn">
                    {dropdownItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(tab.id, item.id)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                          currentTab === `${tab.id}-${item.id}`
                            ? 'bg-amber-50 text-[#E6007E]'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 右側管理者資訊 */}
      <div className="flex items-center space-x-4">
        <span className="text-[#2C3E50] hover:text-black cursor-pointer text-sm">🔔</span>
        <div className="flex items-center space-x-2 bg-[#0B1E2D] px-3 py-1.5 rounded-full border border-slate-700 shadow-sm">
          <div className="w-6 h-6 bg-[#E6007E] rounded-full flex items-center justify-center text-xs font-bold text-white">
            陳
          </div>
          <span className="text-xs font-bold text-yellow-400">管理者</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
