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

  // 表單暫存 State (行程)
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // 表單暫存 State (會友新增彈窗)
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPastoral, setSelectedPastoral] = useState('');
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
  // 1. 實時監聽雲端【行事曆】與【會友】資料庫
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

    // 會友實時監聽
    const qMembers = collection(db, "church_members");
    const unsubMembers = onSnapshot(qMembers, (snapshot) => {
      const membersArray = [];
      snapshot.forEach((doc) => {
        membersArray.push({ id: doc.id, ...doc.data() });
      });
      setMockMembers(membersArray);
    }, (error) => {
      console.error("Firebase 讀取會友失敗:", error);
    });

    return () => {
      unsubEvents();
      unsubMembers();
    };
  }, []);

  // ==========================================
  // 2. 行事曆運作邏輯 (新增/刪除)
  // ==========================================
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;
    try {
      await addDoc(collection(db, "church_events"), {
        title: newTitle,
        date: newDate,
        time: newTime || "整天",
        category: "全教會"
      });
      setNewTitle('');
      setNewDate('');
      setNewTime('');
    } catch (err) {
      console.error("新增行程失敗:", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("確定要刪除這筆行程嗎？")) {
      try {
        await deleteDoc(doc(db, "church_events", id));
      } catch (err) {
        console.error("刪除行程失敗:", err);
      }
    }
  };

  // ==========================================
  // 3. 會友資料庫運作邏輯 (開啟彈窗/新增/刪除)
  // ==========================================
  const handleAddMemberClick = (pastoralName) => {
    let code = 'adult';
    if (pastoralName === '青年牧區') code = 'youth';
    if (pastoralName === '兒童牧區') code = 'children';
    
    setSelectedPastoral(pastoralName);
    setNewMember({
      name: '',
      gender: '弟兄',
      phone: '',
      group: '',
      role: '同工',
      baptized: '已受洗',
      course: '無',
      category: code
    });
    setShowAddModal(true);
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!newMember.name.trim()) {
      alert("請輸入會友姓名");
      return;
    }
    try {
      await addDoc(collection(db, "church_members"), newMember);
      setShowAddModal(false);
    } catch (err) {
      console.error("雲端新增會友失敗:", err);
      alert("同步雲端失敗，請檢查網路！");
    }
  };

  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`確定要將會友【${name}】從雲端資料庫除籍或刪除嗎？`)) {
      try {
        await deleteDoc(doc(db, "church_members", id));
      } catch (err) {
        console.error("雲端刪除會友失敗:", err);
      }
    }
  };

  // 快捷刪除提示（針對搜尋框左側按鈕點擊）
  const handleToolbarDeleteHelp = () => {
    alert("💡 提示：若要刪除/除籍特定的會友資料，請直接點擊下方名單表格中最右側的『🗑 刪除』按鈕即可安全同步雲端！");
  };

  // ==========================================
  // 4. 萬用會友表格渲染模組 (按鈕與搜尋框合併並排)
  // ==========================================
  const renderMemberTable = (categoryName, targetCategory) => {
    const filteredMembers = mockMembers.filter(member => 
      member.category === targetCategory && 
      (member.name?.includes(searchTerm) || member.group?.includes(searchTerm))
    );

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden">
        {/* 精美控制列：按鈕靠在搜尋框左邊排開 */}
        <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center">
            👥 {categoryName} 會友名單管理
            <span className="ml-2 text-xs bg-[#E6007E]/10 text-[#E6007E] px-2 py-0.5 rounded-full font-bold">共 {filteredMembers.length} 人</span>
          </h3>
          
          {/* 工具列組合包：按鈕在搜尋框左邊 */}
          <div className="flex items-center space-x-2">
            <button 
              type="button" 
              onClick={() => handleAddMemberClick(categoryName)}
              className="bg-[#E6007E] hover:bg-[#c4006b] text-white font-black text-xs px-3 py-2 rounded-lg shadow-sm transition-all flex items-center"
            >
              ＋ 新增
            </button>
            <button 
              type="button" 
              onClick={handleToolbarDeleteHelp}
              className="bg-slate-700 hover:bg-slate-800 text-white font-black text-xs px-3 py-2 rounded-lg shadow-sm transition-all flex items-center"
            >
              － 刪除
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜尋姓名或小組..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-gray-700 w-48 focus:outline-none focus:ring-2 focus:ring-[#E6007E] font-medium" 
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400 text-xs pointer-events-none">🔍</span>
            </div>
          </div>
        </div>

        {/* 資料表格 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-4">姓名</th>
                <th className="p-4">稱謂</th>
                <th className="p-4">聯絡電話</th>
                <th className="p-4">所屬小組</th>
                <th className="p-4">教會職分</th>
                <th className="p-4">受洗狀態</th>
                <th className="p-4">生命培育進度</th>
                <th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-400 font-medium">暫無此牧區會友數據，請點擊右上角新增。</td>
                </tr>
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
                      <button 
                        onClick={() => handleDeleteMember(m.id, m.name)}
                        className="text-rose-600 hover:text-rose-950 font-black px-2 py-1 transition-colors"
                      >
                        🗑 刪除
                      </button>
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-600">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'home' && (
          <Dashboard 
            initialEvents={events} 
            loading={loading} 
            handleAddEvent={handleAddEvent} 
            handleDeleteEvent={handleDeleteEvent}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newDate={newDate}
            setNewDate={setNewDate}
            newTime={newTime}
            setNewTime={setNewTime}
          />
        )}

        {currentTab === 'adult-members' && renderMemberTable('成人牧區', 'adult')}
        {currentTab === 'youth-members' && renderMemberTable('青年牧區', 'youth')}
        {currentTab === 'children-members' && renderMemberTable('兒童牧區', 'children')}
      </main>

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
                    <option value="牧師">牧師</option>
                    <option value="長老">長老</option>
                    <option value="傳道">傳道</option>
                    <option value="輔導">輔導</option>
                    <option value="弟兄">弟兄</option>
                    <option value="姊妹">姊妹</option>
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
                    <option value="牧師">牧師</option>
                    <option value="長老">長老</option>
                    <option value="傳道">傳道</option>
                    <option value="輔導">輔導</option>
                    <option value="小組長">小組長</option>
                    <option value="同工">同工</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 font-bold mb-1">受洗狀態</label>
                  <select value={newMember.baptized} onChange={e => setNewMember({...newMember, baptized: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none">
                    <option value="已受洗">已受洗</option>
                    <option value="合格會友">合格會友</option>
                    <option value="慕道友">慕道友</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 font-bold mb-1">生命培育進度</label>
                  <input type="text" value={newMember.course} onChange={e => setNewMember({...newMember, course: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-[#E6007E] focus:outline-none" placeholder="例如：親密之旅、啟航" />
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
