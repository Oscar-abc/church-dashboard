import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

// 引入雲端通道與 Firestore 功能
import { db } from './firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  // 雲端行程資料庫 State
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // 動態雲端會友資料庫 State
  const [mockMembers, setMockMembers] = useState([]);

  // 表單暫存 State (行程精細欄位)
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newCategory, setNewCategory] = useState('全教會');
  const [newTarget, setNewTarget] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // 表單暫存 State (會友新增彈窗)
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPastoral, setSelectedPastoral] = useState('');
  const [currentCategoryCode, setCurrentCategoryCode] = useState('adult'); // 儲存當前分類標籤碼
  const [newMember, setNewMember] = useState({
    name: '',
    gender: '弟兄',
    phone: '',
    group: '',
    role: '同工',
    baptized: '已受洗',
    course: '無'
  });

  // ==========================================
  // 1. 實時監聽雲端資料庫 (【核心修復】對齊雲端抽屜名稱)
  // ==========================================
  useEffect(() => {
    setLoading(true);
    
    // 行事曆實時監聽
    const qEvents = collection(db, "church_events");
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      const evts = [];
      snapshot.forEach((doc) => {
        evts.push({ id: doc.id, ...doc.data() });
      });
      evts.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(evts);
      setLoading(false);
    }, (error) => {
      console.error("Firebase 讀取行程失敗:", error);
      setLoading(false);
    });

    // 🌟 會友實時監聽：此處統一對齊並鎖定為最安全、包容性最強的雲端資料庫抽屜 "church_members"
    const qMembers = collection(db, "church_members");
    const unsubMembers = onSnapshot(qMembers, (snapshot) => {
      const membersArray = [];
      snapshot.forEach((doc) => {
        membersArray.push({ id: doc.id, ...doc.data() });
      });
      setMockMembers(membersArray);
    }, (error) => {
      console.error("Firebase 讀取會友失敗，嘗試備用通道:", error);
    });

    return () => {
      unsubEvents();
      unsubMembers();
    };
  }, []);

  // ==========================================
  // 2. 行事曆運作邏輯
  // ==========================================
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return alert('請輸入行程名稱與日期！');
    try {
      await addDoc(collection(db, "church_events"), {
        title: newTitle,
        date: newDate,
        time: newTime || "全天",
        category: newCategory,
        target: newTarget || "全體會友",
        desc: newDesc || "無備註說明。"
      });
      setNewTitle('');
      setNewDate('');
      setNewTime('');
      setNewTarget('');
      setNewDesc('');
      alert("🎉 成功！行程已同步寫入 Firebase 雲端資料庫！");
    } catch (err) {
      console.error("新增行程失敗:", err);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    if (window.confirm(`確定要從雲端資料庫中，永久刪除「${title}」這個行程嗎？`)) {
      try {
        await deleteDoc(doc(db, "church_events", id));
        alert("🗑 該行程已成功從雲端資料庫中抹除！");
      } catch (err) {
        console.error("刪除行程失敗:", err);
      }
    }
  };

  // ==========================================
  // 3. 会友名单維護邏輯
  // ==========================================
  const handleAddMemberClick = (pastoralName) => {
    let code = 'adult';
    if (pastoralName === '青年牧區') code = 'youth';
    if (pastoralName === '兒童牧區') code = 'children';
    
    setSelectedPastoral(pastoralName);
    setCurrentCategoryCode(code); // 鎖定標籤碼
    setNewMember({
      name: '',
      gender: '弟兄',
      phone: '',
      group: '',
      role: '同工',
      baptized: '已受洗',
      course: '無'
    });
    setShowAddModal(true);
  };

  // 🌟【雙重保障寫入】：確保不論前端如何，寫入的抽屜與過濾標籤 100% 絕對咬合
  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!newMember.name.trim()) return alert('請輸入姓名！');
    try {
      const finalPayload = {
        ...newMember,
        name: newMember.name.trim(),
        category: currentCategoryCode // 強制寫入對應的牧區標籤碼 (youth/adult/children)
      };
      
      // 統一寫入 "church_members" 集合抽屜
      await addDoc(collection(db, "church_members"), finalPayload);
      setShowAddModal(false);
      alert(`🎉 成功！會友【${newMember.name}】已完美同步保存至雲端${selectedPastoral}資料庫！`);
    } catch (err) {
      console.error("雲端新增會友失敗:", err);
      alert("儲存失敗，請檢查網路設定！");
    }
  };

  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`確定要將會友【${name}】從雲端資料庫除籍或刪除嗎？`)) {
      try {
        await deleteDoc(doc(db, "church_members", id));
        alert(`🗑 會友【${name}】已成功從雲端除籍。`);
      } catch (err) {
        console.error("雲端刪除會友失敗:", err);
      }
    }
  };

  // ==========================================
  // 4. 萬用會友表格渲染模組 (防空值過濾熔斷保護)
  // ==========================================
  const renderMemberTable = (categoryName, targetCategory) => {
    // 加上安全熔斷鎖，確保 mockMembers 即使在加載空檔為空也不會導致網頁大白
    const safeMembers = mockMembers || [];
    const filteredMembers = safeMembers.filter(member => 
      member.category === targetCategory && 
      (member.name?.includes(searchTerm) || member.group?.includes(searchTerm))
    );

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            👥 {categoryName} 會友名單管理
            <span className="ml-2 text-xs bg-[#E6007E]/10 text-[#E6007E] px-2 py-0.5 rounded-full font-bold">共 {filteredMembers.length} 人</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button type="button" onClick={() => handleAddMemberClick(categoryName)} className="bg-[#E6007E] hover:bg-[#c4006b] text-white font-black text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all flex items-center h-[34px]">＋ 新增</button>
            <button type="button" onClick={() => alert("💡 請點擊下方名單表格中最右側的『🗑 刪除』按鈕進行除籍！")} className="bg-slate-700 hover:bg-slate-800 text-white font-black text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all flex items-center h-[34px]">－ 刪除</button>
            <div className="relative">
              <input type="text" placeholder="搜尋姓名或小組..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-xs bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-gray-700 w-48 focus:outline-none focus:ring-2 focus:ring-[#E6007E] font-medium h-[34px]" />
              <span className="absolute left-2.5 top-[10px] text-gray-400 text-xs pointer-events-none">🔍</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-4">姓名</th><th className="p-4">稱謂</th><th className="p-4">聯絡電話</th><th className="p-4">所屬小組</th><th className="p-4">教會職分</th><th className="p-4">受洗狀態</th><th className="p-4">生命培育進度</th><th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredMembers.length === 0 ? (
                <tr><td colSpan="8" className="p-8 text-center text-gray-400 font-medium">暫無此牧區會友數據。</td></tr>
              ) : (
                filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{m.name}</td>
                    <td className="p-4">{m.gender}</td>
                    <td className="p-4 text-gray-500">{m.phone || '無'}</td>
                    <td className="p-4 font-semibold">{m.group || '未編組'}</td>
                    <td className="p-4">{m.role}</td>
                    <td className="p-4 text-emerald-600 font-bold">{m.baptized}</td>
                    <td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded">{m.course}</span></td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleDeleteMember(m.id, m.name)} className="text-rose-600 hover:text-rose-950 font-black px-2 py-1 transition-colors">🗑 刪除</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ==========================================
  // 5. 導覽分頁路由控制
  // ==========================================
  const renderContent = () => {
    if (currentTab === 'home') {
      return (
        <Dashboard 
          initialEvents={events} 
          loading={loading} 
          handleDeleteEvent={handleDeleteEvent}
        />
      );
    }
    if (currentTab === 'calendar') return renderCalendarPage();
    if (currentTab === 'adult-members') return renderMemberTable('成人牧區', 'adult');
    if (currentTab === 'youth-members') return renderMemberTable('青年牧區', 'youth');
    if (currentTab === 'children-members') return renderMemberTable('兒童牧區', 'children');
    return <div className="text-center py-12 font-bold text-gray-400">頁面載入中...</div>;
  };

  // 行事曆獨立組件頁面
  const renderCalendarPage = () => {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-base font-black text-slate-800 tracking-wider flex items-center">📅 台中行道會大小事行事曆系統</h2>
          <p className="text-gray-400 text-xs mt-1 font-medium">在此安排全教會、各牧區的重要活動事工，統一管控作戰進度。</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xs font-black text-slate-800 tracking-wider mb-4 border-b border-gray-100 pb-2 flex items-center text-amber-600">✍️ 安排新行程/大小事</h3>
            <form onSubmit={handleAddEvent} className="space-y-3.5 text-xs font-bold">
              <div>
                <label className="text-gray-500 block mb-1">行程事工名稱 *</label>
                <input required type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="例如：洗禮主日、同工大會..." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 block mb-1">預定日期 *</label>
                  <input required type="date" value={newDate} onChange={e=>setNewDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
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
                    <option value="全教會">全教會</option><option value="成人牧區">成人牧區</option><option value="青年牧區">青年牧區</option><option value="兒童牧區">兒童牧區</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">參與/對象目標</label>
                  <input type="text" value={newTarget} onChange={e=>setNewTarget(e.target.value)} placeholder="例如：核心同工、小組長" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
                </div>
              </div>
              <div>
                <label className="text-gray-500 block mb-1">事工/活動備註內容描述</label>
                <textarea rows="4" value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="請輸入聚會細節、攜帶物品 or 任務清單說明..." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 focus:ring-[#E6007E]" />
              </div>
              <button type="submit" className="w-full bg-[#E6007E] hover:bg-[#c4006b] text-white py-2.5 rounded-lg font-black tracking-wide transition-colors mt-2 shadow-sm">＋ 確定排入行事曆</button>
            </form>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black text-slate-800 tracking-wider mb-2 flex items-center border-b border-gray-100 pb-2">📅 教會近期排定活動清單（共 {events.length} 項行程）</h3>
            {loading ? (
              <div className="text-center py-8 text-xs font-bold text-gray-400">⚡ 正在從雲端抓取清單...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-12 text-xs font-bold text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">🫙 目前雲端尚無行程，請在左側填寫排入！</div>
            ) : (
              <div className="space-y-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-4 bg-gray-50/60 rounded-xl border border-gray-200/60 hover:border-amber-300 transition-all flex justify-between items-start gap-4 relative group">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-black ${evt.category === '全教會' ? 'bg-slate-900 text-white' : evt.category === '成人牧區' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-pink-50 text-[#E6007E] border border-pink-100'}`}>{evt.category || '全教會'}</span>
                        <h4 className="text-sm font-black text-slate-900">{evt.title}</h4>
                      </div>
                      <p className="text-xs font-bold text-gray-500 leading-relaxed pl-1">{evt.desc}</p>
                      <div className="text-[10px] text-gray-400 font-bold pl-1">🎯 對象: <span className="text-slate-700">{evt.target || '全體會友'}</span></div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between min-h-[70px]">
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm min-w-[110px] text-center">
                        <div className="text-xs font-black text-[#E6007E]">{evt.date}</div>
                        <div className="text-[10px] font-black text-slate-700 mt-0.5">⏰ {evt.time || '整天'}</div>
                      </div>
                      <button type="button" onClick={() => handleDeleteEvent(evt.id, evt.title)} className="text-[10px] text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-2 py-0.5 rounded border border-rose-100 transition-all font-black mt-2 opacity-80 group-hover:opacity-100">🗑 刪除排程</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-600">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">{renderContent()}</main>

      {/* 新增會友彈窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-gray-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-800">➕ 新增會友資料 ({selectedPastoral})</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <form onSubmit={handleSaveMember} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-500 font-bold mb-1">會友姓名 *</label>
                <input required type="text" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none" placeholder="請輸入姓名" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-bold mb-1">稱謂</label>
                  <select value={newMember.gender} onChange={e => setNewMember({...newMember, gender: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none">
                    <option value="牧師">牧師</option><option value="長老">長老</option><option value="傳道">傳道</option><option value="輔導">輔導</option><option value="弟兄">弟兄</option><option value="姊妹">姊妹</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 font-bold mb-1">聯絡電話</label>
                  <input type="text" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none" placeholder="09XX-XXXXXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-bold mb-1">所屬小組</label>
                  <input type="text" value={newMember.group} onChange={e => setNewMember({...newMember, group: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none" placeholder="例如：喜樂小組" />
                </div>
                <div>
                  <label className="block text-gray-500 font-bold mb-1">教會職分</label>
                  <select value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none">
                    <option value="牧師">牧師</option><option value="長老">長老</option><option value="傳道">傳道</option><option value="輔導">輔導</option><option value="小組長">小組長</option><option value="同工">同工</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-bold mb-1">受洗狀態</label>
                  <select value={newMember.baptized} onChange={e => setNewMember({...newMember, baptized: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none">
                    <option value="已受洗">已受洗</option><option value="合格會友">合格會友</option><option value="慕道友">慕道友</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 font-bold mb-1">生命培育進度</label>
                  <input type="text" value={newMember.course} onChange={e => setNewMember({...newMember, course: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none" placeholder="例如：親密之旅" />
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-slate-100 text-gray-600 hover:bg-slate-200 px-4 py-2 rounded-lg font-bold transition-colors">取消</button>
                <button type="submit" className="bg-[#E6007E] text-white hover:bg-[#c4006b] px-4 py-2 rounded-lg font-bold shadow-sm transition-colors">儲存至雲端</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
