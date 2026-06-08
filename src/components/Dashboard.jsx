import React from 'react';

function Dashboard({ 
  initialEvents = [], 
  loading, 
  handleAddEvent, 
  handleDeleteEvent,
  newTitle,
  setNewTitle,
  newDate,
  setNewDate,
  newTime,
  setNewTime
}) {
  
  // 安全熔斷鎖：確保行程在加載空檔不崩潰
  const safeEvents = initialEvents || [];

  // 1. 焦點動態：本週服事輪值表數據
  const sundayService = {
    speaker: '張茂松 牧師',
    leader: '陳冠宏 門徒',
    pianist: '林美惠 姊妹',
    audio: '李明翰 兄弟',
    usher: '王淑芬 姊妹'
  };

  // 2. 健康警訊：「好久不見」連續 3 週未出席關懷名單
  const alertMembers = [
    { name: '張建國', group: '大衛小組', missedWeeks: 3, lastAttended: '2026-05-17', status: '未聯繫' },
    { name: '林美惠', group: '喜樂小組', missedWeeks: 4, lastAttended: '2026-05-10', status: '已約探訪' }
  ];

  // 3. 快捷同工區：本日壽星
  const todayBirthdays = [
    { name: '蔡依婷', group: '提摩太小組', date: '06-08' }
  ];

  const handleLineReminder = () => {
    alert('🚀 一鍵派發成功！已自動擷取本週服事人員與關懷警示名單，透過 API 發送 LINE 提醒至各牧區長與小組長群組！');
  };

  const handleCopyBirthdayText = (name) => {
    const text = `親愛的${name}，祝你生日快樂！願主在新的一年裡大大擴張你的境界，賜福你的家庭與事奉，如鷹返老還童！`;
    navigator.clipboard.writeText(text);
    alert(`📋 已自動複製【${name}】的生日祝福簡訊，可直接貼上傳送！`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-600 font-sans">
      
      {/* ==================== 區塊 1：📅 本週焦點即時動態 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 本週服事輪值表簡報 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-black text-slate-800 flex items-center">📋 本週主日服事輪值表</h3>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">本週主日</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-400">講員牧師</span><span className="font-bold text-slate-800">{sundayService.speaker}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-400">敬拜主領</span><span className="font-bold text-[#E6007E]">{sundayService.leader}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-400">司琴同工</span><span className="font-medium text-slate-700">{sundayService.pianist}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-400">音控/投影</span><span className="font-medium text-slate-700">{sundayService.audio}</span></div>
              <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-400">招待同工</span><span className="font-medium text-slate-700">{sundayService.usher}</span></div>
            </div>
          </div>
          <button onClick={handleLineReminder} className="w-full mt-4 bg-[#E6007E] hover:bg-[#c4006b] text-white font-black py-2 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center space-x-1">
            <span>💬 一鍵發送 LINE 服事提醒</span>
          </button>
        </div>

        {/* 近期重要事工倒數 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center">⏳ 近期重要事工倒數</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">親密之旅培育小組開課</span>
                  <span className="text-rose-600 font-black animate-pulse">倒數 12 天</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#E6007E] to-rose-400 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>報名進度: 17/20 人</span><span>目標達成率 85%</span></div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">夏季全教會浸禮門徒班</span>
                  <span className="text-slate-500 font-medium">2026/07/12</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-900 h-full rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>目前已報名: 8 人</span><span>進度: 40%</span></div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 text-center border-t pt-2 border-gray-100">門徒培育系統運作正常</div>
        </div>

        {/* 今日代禱事項牆 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 mb-2 flex items-center">🙏 今日緊急代禱事項牆</h3>
            <p className="text-gray-400 text-[10px] mb-3">各小組長今日即時回報欄位</p>
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              <div className="p-2.5 bg-amber-50/40 rounded-lg border border-amber-100 text-xs">
                <span className="font-bold text-amber-800">[大衛小組] </span>
                建國弟兄因車禍住院，目前骨折開刀順利，求主保守後續康復與傷口復原不發炎。
              </div>
              <div className="p-2.5 bg-purple-50/40 rounded-lg border border-purple-100 text-xs">
                <span className="font-bold text-purple-800">[喜樂小組] </span>
                美惠姊妹家中長輩今天下午突發高血壓送醫檢查，求神賜下平安與醫治的恩典。
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 text-right font-bold pt-2">✨ 晨禱同工已同步</div>
        </div>

      </div>

      {/* ==================== 區塊 2：📈 聚會出席趨勢與健康警訊 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 三大牧區出席對比明細 */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80">
          <h3 className="text-sm font-black text-slate-800 mb-1 flex items-center">📊 三大牧區聚會出席波動 (過去4週)</h3>
          <p className="text-gray-400 text-[10px] mb-4">即時呈現牧養生命健康穩定度</p>
          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1"><span>🔥 成人牧區 (大衛/喜樂)</span><span className="text-slate-900">穩定（本週 142 人）</span></div>
              <div className="flex space-x-1 text-[10px] text-center font-bold text-white">
                <div className="bg-slate-300 rounded-sm py-0.5 flex-1">135人</div>
                <div className="bg-slate-400 rounded-sm py-0.5 flex-1">138人</div>
                <div className="bg-slate-500 rounded-sm py-0.5 flex-1">140人</div>
                <div className="bg-slate-900 rounded-sm py-0.5 flex-1">142人</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold mb-1"><span>⚡ 青年牧區 (提摩太/約書亞)</span><span className="text-[#E6007E]">成長中（本週 58 人）</span></div>
              <div className="flex space-x-1 text-[10px] text-center font-bold text-white">
                <div className="bg-rose-200 rounded-sm py-0.5 flex-1">45人</div>
                <div className="bg-rose-300 rounded-sm py-0.5 flex-1">50人</div>
                <div className="bg-rose-400 rounded-sm py-0.5 flex-1">52人</div>
                <div className="bg-[#E6007E] rounded-sm py-0.5 flex-1">58人</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold mb-1"><span>👶 兒童牧區 (喜樂精兵)</span><span className="text-emerald-600">持平（本週 35 人）</span></div>
              <div className="flex space-x-1 text-[10px] text-center font-bold text-white">
                <div className="bg-emerald-200 rounded-sm py-0.5 flex-1">36人</div>
                <div className="bg-emerald-300 rounded-sm py-0.5 flex-1">34人</div>
                <div className="bg-emerald-400 rounded-sm py-0.5 flex-1">35人</div>
                <div className="bg-emerald-600 rounded-sm py-0.5 flex-1">35人</div>
              </div>
            </div>
          </div>
        </div>

        {/* 好久不見關鍵警訊 */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-black text-slate-800 flex items-center">🚨 「好久不見」牧養關懷警訊</h3>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-black">黃金關懷期</span>
            </div>
            <p className="text-gray-400 text-[10px] mb-3">系統偵測：連續 3 週以上未出席聚會且未請假之具名會友摘要</p>
            
            <div className="space-y-2">
              {alertMembers.map((w, idx) => (
                <div key={idx} className="p-2.5 bg-rose-50/40 rounded-xl border border-rose-100/60 flex justify-between items-center text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-slate-900 text-sm">{w.name}</span>
                      <span className="text-[9px] bg-slate-900 text-white px-1.5 py-0.5 rounded font-black">{w.group}</span>
                      <span className="text-[10px] text-gray-400 font-medium">最後出席: {w.lastAttended}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-rose-700 font-black bg-rose-100 px-2 py-0.5 rounded-full">連續缺席 {w.missedWeeks} 週</span>
                    <span className={`text-[10px] font-black ${w.status === '已約探訪' ? 'text-emerald-600' : 'text-amber-600'}`}>● {w.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleLineReminder} className="w-full mt-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs transition-all">
            📋 匯出健康警訊報表並分派至各牧區長 LINE
          </button>
        </div>

      </div>

      {/* ==================== 區塊 3：📝 快捷同工作業區 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 快速簽到與新朋友追蹤進度 */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black text-slate-800">⚡ 快捷行政同工作業入口</h3>
            <div className="flex space-x-2">
              <button onClick={() => alert('進入主日點名簽到系統...')} className="bg-[#E6007E] text-white px-3 py-1 rounded-md text-[11px] font-black hover:bg-[#c4006b] shadow-sm transition-colors">🎯 開啟主日快速點名</button>
              <button onClick={() => alert('進入週間小組簽到系統...')} className="bg-slate-900 text-white px-3 py-1 rounded-md text-[11px] font-black hover:bg-slate-800 shadow-sm transition-colors">🏫 週間小組簽到</button>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700">🌱 本月新朋友追蹤跟進進度表</span>
              <span className="text-[10px] text-gray-400">本月累計: +6 位新朋友</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                <div className="font-bold text-slate-800">林香君 <span className="text-[10px] font-medium text-gray-400">(青年)</span></div>
                <div className="text-gray-500">跟進同工: 冠宏門徒</div>
                <div className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">● 穩定參與小組</div>
              </div>
            </div>
          </div>
        </div>

        {/* 本日壽星名單區 */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800 mb-1 flex items-center">🎂 本週壽星溫馨名單牆</h3>
            <p className="text-gray-400 text-[10px] mb-3">別忘了給家人送上第一手的主內祝福</p>
            <div className="space-y-2">
              {todayBirthdays.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-amber-50/20 rounded-xl border border-amber-100/50 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{b.name}</span>
                    <span className="ml-1.5 text-[9px] bg-amber-500 text-white font-bold px-1.5 py-0.5 rounded-full">{b.group}</span>
                  </div>
                  <button onClick={() => handleCopyBirthdayText(b.name)} className="text-amber-700 font-bold hover:underline text-[11px]">
                    📋 複製祝福簡訊
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[10px] text-gray-400 text-center border-t pt-2 border-gray-100 mt-2">小組聯絡率目前達成 100%</div>
        </div>

      </div>

      {/* ==================== 底部：📅 全教會近月重要行事曆 ==================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <h3 className="text-xs font-black tracking-wider flex items-center">📅 全教會近月重要行事曆大底盤</h3>
          <form onSubmit={handleAddEvent} className="flex items-center space-x-2 text-slate-800">
            <input required type="text" placeholder="行程名稱" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-white rounded px-2 py-1 text-xs w-36 focus:outline-none" />
            <input required type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="bg-white rounded px-2 py-1 text-xs w-28 focus:outline-none" />
            <input type="text" placeholder="時間(選填)" value={newTime} onChange={e => setNewTime(e.target.value)} className="bg-white rounded px-2 py-1 text-xs w-20 focus:outline-none" />
            <button type="submit" className="bg-[#E6007E] text-white hover:bg-[#c4006b] px-3 py-1 rounded text-xs font-black transition-colors">＋新增行程</button>
          </form>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400 font-medium">⏳ 正在與 Google 雲端安全通道同步中...</div>
          ) : safeEvents.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400 font-medium">暫無近期重要行程，請在右上方快速控制列新增。</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-bold">
                    <th className="pb-3 pl-2">活動日期</th>
                    <th className="pb-3">時間</th>
                    <th className="pb-3">行程內容</th>
                    <th className="pb-3 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {safeEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-amber-50/10 transition-colors">
                      <td className="py-3.5 pl-2 font-bold text-slate-900">{evt.date}</td>
                      <td className="py-3.5 text-gray-500 font-medium">{evt.time || '整天'}</td>
                      <td className="py-3.5 font-bold text-slate-800">{evt.title}</td>
                      <td className="py-3.5 text-center">
                        <button 
                          onClick={() => handleDeleteEvent(evt.id)} 
                          className="text-rose-600 hover:text-rose-900 font-bold px-2 py-1"
                        >
                          🗑 刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
