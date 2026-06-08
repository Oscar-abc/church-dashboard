import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

// 模擬教會本地端會友名單數據
const mockMembers = [
  { id: 1, name: '張建國', gender: '弟兄', phone: '0912-345678', group: '大衛小組', role: '小組長', baptized: '已受洗', course: '生命培育一', category: 'adult' },
  { id: 2, name: '林美惠', gender: '姊妹', phone: '0923-456789', group: '喜樂小組', role: '同工', baptized: '已受洗', course: '門徒培育二', category: 'adult' },
  { id: 3, name: '陳冠宏', gender: '弟兄', phone: '0934-567890', group: '仁愛小組', role: '會友', baptized: '已受洗', course: '親密之旅', category: 'adult' },
  { id: 4, name: '王淑芬', gender: '姊妹', phone: '0945-678901', group: '喜樂小組', role: '會友', baptized: '慕道友', course: '啟航課程', category: 'adult' },
  { id: 5, name: '李明翰', gender: '弟兄', phone: '0956-789012', group: '約書亞小組', role: '同工', baptized: '已受洗', course: '青少生命班', category: 'youth' },
  { id: 6, name: '蔡依婷', gender: '姊妹', phone: '0967-890123', group: '提摩太小組', role: '會友', baptized: '合格會友', course: '初信造就', category: 'youth' },
];

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  // 教會重要行程資料庫
  const [events, setEvents] = useState([
    { id: 1, title: '主日崇拜與同工大會', date: '2026-06-14', time: '09:30', category: '全教會', target: '成人/青年', desc: '邀請張茂松牧師培靈，會後召開第三季核心同工策略會議。' },
    { id: 2, title: '親密之旅關係培訓班 開課', date: '2026-06-20', time: '14:00', category: '成人牧區', target: '已報名夫妻/情侶', desc: '第一堂：因愛結合，因了解而分開？探討親密關係發展階段。' },
    { id: 3, title: '青年牧區 戶外草地敬拜讚美祭', date: '2026-06-27', time: '18:30', category: '青年牧區', target: '全體青少/大專生', desc: '地點在台中中央公園草皮，歡迎邀請福音朋友參加。' },
  ]);

  // 表單暫存 State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newCategory, setNewCategory] = useState('全教會');
  const [newTarget, setNewTarget] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // 處理安排新行程
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return alert('請輸入行程名稱與日期！');
    
    const newEventObj = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
      time: newTime || '全天',
      category: newCategory,
      target: newTarget || '全體會友',
      desc: newDesc || '無備註說明。'
    };

    setEvents([newEventObj, ...events].sort((a,b) => a.date.localeCompare(b.date)));
    
    setNewTitle(''); setNewDate(''); setNewTime(''); setNewTarget(''); setNewDesc('');
    alert('🎉 教會重要行程已成功排入行事曆！');
  };

  const renderMemberTable = (categoryName, targetCategory) => {
    const filteredMembers = mockMembers.filter(member => 
      member.category === targetCategory && 
      (member.name.includes(searchTerm) || member.group.includes(searchTerm))
    );

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            👥 {categoryName} 會友名單管理
            <span className="ml-2 text-xs bg-[#E6007E]/10 text-[#E6007E] px-2 py-0.5 rounded-full">共 {filteredMembers.length} 人</span>
          </h3>
          <input
            type="text"
            placeholder="🔍 搜尋姓名或小組..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 w-64 focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-4">姓名</th><th className="p-4">性別</th><th className="p-4">聯絡電話</th><th className="p-4">所屬小組</th><th className="p-4">教會職分</th><th className="p-4">受洗狀態</th><th className="p-4">生命培育進度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredMembers.map(m => (
                <tr key={m.id} className="hover:bg-amber-50/20">
                  <td className="p-4 font-bold text-slate-900">{m.name}</td>
                  <td className="p-4">{m.gender}</td><td className="p-4 text-gray-500">{m.phone}</td><td className="p-4 font-semibold">{m.group}</td><td className="p-4">{m.role}</td><td className="p-4 text-emerald-600 font-bold">{m.baptized}</td><td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded">{m.course}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 渲染全新的行事曆介面
  const renderCalendarContent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-base font-black text-slate-800 tracking-wider">📅 台中行道會大小事行事曆系統</h2>
          <p className="text-gray-400 text-xs mt-1 font-medium">在此安排全教會、各牧區的重要活動事工，統一管控作戰進度。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 左側：排定行程表單 */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xs font-black text-slate-800 tracking-wider mb-4 border-b border-gray-100 pb-2">✍️ 安排新行程/大小事</h3>
            <form onSubmit={handleAddEvent} className="space-y-3.5 text-xs font-bold">
              <div>
                <label className="text-gray-500 block mb-1">行程事工名稱 *</label>
                <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="例如：洗禮主日、同工大會..." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 block mb-1">預定日期 *</label>
                  <input type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">預定時間</label>
                  <input type="time" value={newTime} onChange={e=>setNewTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 block mb-1">主辦牧區/歸屬</label>
                  <select value={newCategory} onChange={e=>setNewCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]">
                    <option value="全教會">全教會</option>
                    <option value="成人牧區">成人牧區</option>
                    <option value="青年牧區">青年牧區</option>
                    <option value="兒童牧區">兒童牧區</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">參與/對象目標</label>
                  <input type="text" value={newTarget} onChange={e=>setNewTarget(e.target.value)} placeholder="例如：核心同工、小組長" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 block mb-1">事工/活動備註內容描述</label>
                <textarea rows="3" value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="請輸入聚會細節、攜帶物品或任務清單說明..." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
              </div>
              <button type="submit" className="w-full bg-[#E6007E] hover:bg-[#c4006b] text-white py-2.5 rounded-lg font-black tracking-wide transition-colors mt-2 shadow-sm">
                ➕ 確定排入行事曆
              </button>
            </form>
          </div>

          {/* 右側：行程列表 */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black text-slate-800 tracking-wider border-b border-gray-100 pb-2">📅 教會近期排定活動清單（共 {events.length} 項行程）</h3>
            
            <div className="space-y-3.5">
              {events.map((evt) => (
                <div key={evt.id} className="p-4 bg-gray-50/60 rounded-xl border border-gray-200/60 hover:border-amber-300 transition-all flex flex-col sm:flex-row justify-between gap-4 items-start">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-black ${
                        evt.category === '全教會' ? 'bg-slate-900 text-white' : evt.category === '成人牧區' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-pink-50 text-[#E6007E] border border-pink-200'
                      }`}>
                        {evt.category}
                      </span>
                      <h4 className="text-sm font-black text-slate-900">{evt.title}</h4>
                    </div>
                    <p className="text-xs font-bold text-gray-500 leading-relaxed pl-1">{evt.desc}</p>
                    <div className="text-[10px] text-gray-400 font-bold pl-1 flex space-x-4">
                      <span>🎯 對象: <span className="text-slate-700">{evt.target}</span></span>
                    </div>
                  </div>
                  
                  <div className="text-right bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm min-w-[110px] flex flex-col justify-center items-center">
                    <span className="text-xs font-black text-[#E6007E]">{evt.date}</span>
                    <span className="text-[10px] font-black text-slate-700 mt-0.5">⏰ {evt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentTab === 'calendar') return renderCalendarContent();
    if (currentTab.startsWith('adult')) {
      if (currentTab === 'adult-members') return renderMemberTable('成人牧區', 'adult');
      return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">🌳 【成人牧區】 面板開發中...</div>;
    }
    if (currentTab.startsWith('youth')) {
      if (currentTab === 'youth-members') return renderMemberTable('青年牧區', 'youth');
      return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">⚡ 【青年牧區】 面板開發中...</div>;
    }
    if (currentTab.startsWith('children')) {
      if (currentTab === 'children-members') return renderMemberTable('兒童牧區', 'children');
      return <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-bold">🎈 【兒童牧區】 面板開發中...</div>;
    }
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
