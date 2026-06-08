import React from 'react';

function Dashboard({ 
  initialEvents = [], 
  loading, 
  handleDeleteEvent
}) {
  
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
    { name: '親密之旅關係培訓班', date: '2026/06/20', daysLeft: 13, registered: 28, max: 40, percent: 70 },
    { name: '門徒造就 啟航班', date: '2026/07/05', daysLeft: 28, registered: 12, max: 30, percent: 40 }
  ];

  // 3. 今日緊急代禱事項
  const prayers = [
    { id: 1, tag: '緊急代禱', time: '2小時前', group: '大衛小組', content: '為成人牧區建國弟兄下週的手術順利與身體復原禱告，求神保守。' },
    { id: 2, tag: '事工代禱', time: '今天上午', group: '喜樂小組', content: '為暑期兒童聖經營的同工招募與教案籌備守望，目前仍缺2位輔導。' }
  ];

  // 4. 三大牧區出席波動趨勢 (過去4週)
  const attendanceTrends = [
    { week: 'W1 (上上上週)', adult: 210, youth: 85, children: 45 },
    { week: 'W2 (上上週)', adult: 225, youth: 92, children: 42 },
    { week: 'W3 (上週)', adult: 198, youth: 78, children: 48 },
    { week: 'W4 (本週主日)', adult: 220, youth: 95, children: 50 }
  ];

  // 5. 「好久不見」關懷警訊名單
  const alertMembers = [
    { name: '王小芬', group: '喜樂小組', missedWeeks: 3, lastAttended: '2026/05/17', status: '未聯繫' },
    { name: '李大同', group: '約書亞小組', missedWeeks: 4, lastAttended: '2026/05/10', status: '已約探訪' }
  ];

  const handleLineReminder = () => {
    alert('🚀 一鍵發送成功！已自動擷取本週服事同工與關懷名單，透過 LINE API 發送提醒通知！');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-600 font-sans">
      
      {/* ❯❯ 這裡已成功將原先頂部的深藍色各區域達成明細表格 (紅框處) 徹底移除 ❮❮ */}

      {/* ==================== 區塊 1：📅 本週焦點即時動態 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. 本週主日服事輪值表 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-slate-800 flex items-center">📋 本週主日服事輪值表</h3>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">本週主日 09:30</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-400 font-bold">本週講員</span><div className="flex items-center space-x-2"><span className="font-bold text-slate-800">{sundayService.speaker}</span><span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black">已確認</span></div></div>
              <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-400 font-bold">主日主領</span><div className="flex items-center space-x-2"><span className="font-bold text-[#E6007E]">{sundayService.leader}</span><span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black">Ref已確認</span></div></div>
              <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-400 font-bold">敬拜司琴</span><div className="flex items-center space-x-2"><span className="font-medium text-slate-700">{sundayService.pianist}</span><span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black">已確認</span></div></div>
              <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-400 font-bold">音控/投影</span><div className="flex items-center space-x-2"><span className="font-medium text-slate-700">{sundayService.audio}</span><span className="text-[9px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-black animate-pulse">提醒未讀</span></div></div>
            </div>
          </div>
          <button onClick={handleLineReminder} className="w-full mt-4 bg-[#E6007E] hover:bg-[#c4006b] text-white font-black py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1">
            <span>💬 一鍵 LINE 提醒通知同工</span>
          </button>
        </div>

        {/* B. 近期核心事工進度 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center">🚀 核心培育事工倒數</h3>
            <div className="space-y-4">
              {incomingEvents.map((e, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black text-slate-800">{e.name}</span>
                    <span className="text-rose-600 font-black bg-rose-50 px-2 py-0.5 rounded">倒數 {e.daysLeft} 天</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>開課日: 2026/06/20</span>
                    <span className="text-slate-700">已報名 {e.registered}/{e.max} 人</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-[#E6007E] h-full rounded-full" style={{ width: `${e.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 text-center border-t pt-2 border-gray-100 mt-4">門徒培育系統運作正常</div>
        </div>

        {/* C. 今日守望代禱牆 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center">🙏 今日守望代禱牆</h3>
            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {prayers.map(p => (
                <div key={p.id} className="p-3 bg-amber-50/30 rounded-xl border border-amber-100/70 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${p.tag === '緊急代禱' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                      {p.tag}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{p.time}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    <span className={p.id === 1 ? 'text-amber-800' : 'text-purple-800'}>[{p.group}] </span>
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-right font-bold pt-2">✨ 晨禱同工已同步</div>
        </div>

      </div>

      {/* ==================== 區塊 2：📈 聚會出席趨勢與健康警訊 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. 三大牧區出席波動趨勢 */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center">📊 牧區出席波動趨勢（過去 4 週）</h3>
            <div className="flex space-x-3 text-[10px] font-bold">
              <span className="flex items-center text-slate-800"><span className="w-2.5 h-2.5 bg-slate-900 rounded-full mr-1"></span> 成人</span>
              <span className="flex items-center text-[#E6007E]"><span className="w-2.5 h-2.5 bg-[#E6007E] rounded-full mr-1"></span> 青年</span>
              <span className="flex items-center text-amber-500"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-1"></span> 兒童</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 pt-1">
            {attendanceTrends.map((t, idx) => (
              <div key={idx} className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-black text-gray-400 text-center block border-b border-gray-200 pb-1">{t.week}</span>
                <div className="space-y-2 text-[10px] font-bold">
                  <div>
                    <div className="flex justify-between text-slate-700"><span>成人</span><span>{t.adult}人</span></div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-0.5"><div className="bg-slate-900 h-full rounded-full" style={{ width: `${(t.adult/250)*100}%` }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#E6007E]"><span>青年</span><span>{t.youth}人</span></div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-0.5"><div className="bg-[#E6007E] h-full rounded-full" style={{ width: `${(t.youth/120)*100}%` }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-amber-600"><span>兒童</span><span>{t.children}人</span></div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-0.5"><div className="bg-amber-500 h-full rounded-full" style={{ width: `${(t.children/60)*100}%` }} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. 好久不見關鍵警訊 */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-black text-rose-600 tracking-wider flex items-center animate-pulse">
                🚨 「好久不見」牧養關懷警訊
              </h3>
              <span className="text-[9px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-black">連續缺席 3 週+</span>
            </div>
            <p className="text-gray-400 text-[10px] mb-3">系統偵測：連續聚會且未請假之具名會友摘要</p>
            
            <div className="space-y-2.5">
              {alertMembers.map((w, idx) => (
                <div key={idx} className="p-3 bg-rose-50/40 rounded-xl border border-rose-100/60 flex justify-between items-center text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-slate-900 text-sm">{w.name}</span>
                      <span className="text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-black">{w.group}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold mt-0.5">最後出席: 2026-05-17</div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] text-rose-700 font-black bg-rose-100 px-1.5 py-0.5 rounded-full">缺席 {w.missedWeeks} 週</span>
                    <span className={`text-[9px] font-black mt-1 ${w.status === '已約探訪' ? 'text-emerald-600' : 'text-amber-600'}`}>● {w.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => alert('已成功匯出連續未出席關懷名單，並發送至各區 LINE 帳群！')} className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm">
            📋 匯出健康警訊報表並分派至各牧區長 LINE
          </button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
