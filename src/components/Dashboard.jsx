import React from 'react';

export default function Dashboard() {
  // 原有的核心數據指標資料
  const metrics = [
    { title: '弟兄新員', value: '1', target: '200', percentage: '1%', color: 'border-blue-500 text-blue-600', progressColor: '#3B82F6' },
    { title: '弟兄會費', value: '229', target: '1,597', percentage: '14%', color: 'border-blue-600 text-blue-700', progressColor: '#2563EB' },
    { title: '弟兄聖奉', value: '4K', target: '6,467K', percentage: '0%', color: 'border-slate-400 text-slate-500', progressColor: '#94A3B8' },
    { title: '教會見證 (含已安排)', value: '177', target: '797', percentage: '22%', color: 'border-purple-500 text-purple-600', progressColor: '#A855F7' },
    { title: '贈送聖經', value: '642', target: '259,388', percentage: '0%', color: 'border-slate-400 text-slate-500', progressColor: '#94A3B8' },
    { title: '姊妹新員', value: '1', target: '132', percentage: '1%', color: 'border-pink-500 text-pink-600', progressColor: '#EC4899' },
    { title: '姊妹會費', value: '226', target: '1,139', percentage: '20%', color: 'border-pink-600 text-pink-700', progressColor: '#DB2777' },
    { title: '姊妹聖奉', value: '0', target: '1,585K', percentage: '0%', color: 'border-slate-400 text-slate-500', progressColor: '#94A3B8' },
    { title: '教會聖奉', value: '500', target: '14,663K', percentage: '0%', color: 'border-emerald-500 text-emerald-600', progressColor: '#10B981' },
    { title: '姊妹贈經', value: '0', target: '34,060', percentage: '0%', color: 'border-slate-400 text-slate-500', progressColor: '#94A3B8' },
  ];

  // 模擬本週焦點即時動態資料
  const thisWeekService = [
    { role: '本週講員', name: '張茂松 牧師', status: '已確認' },
    { role: '主日主領', name: '陳冠宏 弟兄', status: '已確認' },
    { role: '敬拜司琴', name: '林美惠 姊妹', status: '已確認' },
    { role: '音控/投影', name: '李明翰 弟兄', status: '提醒未讀' },
  ];

  const incomingEvents = [
    { name: '親密之旅 關係培訓班', date: '2026/06/20', daysLeft: 13, registered: 28, max: 40 },
    { name: '門徒造就 啟航班', date: '2026/07/05', daysLeft: 28, registered: 12, max: 30 },
  ];

  const prayers = [
    { id: 1, tag: '緊急代禱', content: '為成人牧區建國弟兄下週的手術順利與身體復原禱告，求神保守。', time: '2小時前' },
    { id: 2, tag: '事工代禱', content: '為暑期兒童聖經營的同工招募與教案籌備守望，目前仍缺2位輔導。', time: '今天上午' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 頂部篩選列與結帳日 */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-base font-black text-slate-800 tracking-wider">全國目標達成率</h2>
          <select className="bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-1.5 font-bold text-gray-700">
            <option>2027 年度</option>
          </select>
          <select className="bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-1.5 font-bold text-gray-700">
            <option>全部區域</option>
          </select>
          <select className="bg-gray-50 border border-gray-300 rounded-lg text-xs px-3 py-1.5 font-bold text-gray-700">
            <option>選擇支會</option>
          </select>
        </div>
        <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-800 flex items-center">
          📅 結帳日：2026-06-06
        </div>
      </div>

      {/* 數據指標卡片區（10格精美圓圈卡片） */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center justify-between min-h-[180px] hover:shadow-md transition-shadow">
            <span className="text-xs font-black text-slate-500 mb-2">{m.title}</span>
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* 簡單的圓圈進度條背景 */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" stroke="#F1F5F9" strokeWidth="6" fill="transparent" />
                <circle cx="40" cy="40" r="34" stroke={m.progressColor} strokeWidth="6" fill="transparent" 
                        strokeDasharray="213.6" strokeDashoffset={213.6 - (213.6 * parseInt(m.percentage)) / 100} />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">{m.percentage}</span>
            </div>
            <div className="mt-2">
              <div className={`text-base font-black ${m.color.split(' ')[1]}`}>{m.value}</div>
              <div className="text-[10px] text-gray-400 font-bold">/ {m.target}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 各區域達成明細表格 */}
      <div className="bg-[#0F172A] rounded-xl shadow-sm overflow-hidden text-white">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/60">
          <h3 className="text-xs font-black tracking-wider text-slate-300">各區域達成明細</h3>
          <span className="text-[10px] bg-slate-800 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">資料即時連線中</span>
        </div>
        <div className="overflow-x-auto text-[11px] font-bold">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/30">
                <th className="p-3">區域</th>
                <th className="p-3 text-blue-400">弟兄年初</th>
                <th className="p-3 text-blue-400">弟兄目標</th>
                <th className="p-3 text-pink-400">姊妹年初</th>
                <th className="p-3 text-pink-400">姊妹目標</th>
                <th className="p-3 text-amber-400">會費(弟/姊)</th>
                <th className="p-3 text-emerald-400">教會奉獻成果</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-slate-200">❯ 北特</td>
                <td className="p-3 text-blue-300">330</td>
                <td className="p-3 text-slate-400">36</td>
                <td className="p-3 text-pink-300">208</td>
                <td className="p-3 text-slate-400">24</td>
                <td className="p-3 text-amber-300">40 / 47</td>
                <td className="p-3 text-emerald-400">5,412,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== 【新亮點：1. 本週焦點即時動態】 ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* A. 本週主日服事表 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black text-slate-800 tracking-wider flex items-center">
                📋 本週主日服事輪值
              </h3>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">本週日 09:30</span>
            </div>
            <div className="space-y-2.5">
              {thisWeekService.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">{s.role}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-slate-800">{s.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${s.status === '已確認' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600 animate-pulse'}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => alert('已自動產生本週服事提醒，並透過 LINE Notify 發送給相關同工！')}
            className="w-full mt-4 bg-[#E6007E] hover:bg-[#c4006b] text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            💬 一鍵 LINE 提醒通知同工
          </button>
        </div>

        {/* B. 近期核心事工進度 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-slate-800 tracking-wider mb-4 flex items-center">
            🚀 核心培育事工倒數
          </h3>
          <div className="space-y-4">
            {incomingEvents.map((e, idx) => {
              const progressPercent = Math.min(100, (e.registered / e.max) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800">{e.name}</span>
                    <span className="text-[10px] text-rose-600 font-black bg-rose-50 px-2 py-0.5 rounded">
                      倒數 {e.daysLeft} 天
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>開課日: {e.date}</span>
                    <span className="text-slate-700">已報名 {e.registered}/{e.max} 人</span>
                  </div>
                  {/* 進度條外殼 */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-[#E6007E] h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* C. 今日緊急代禱牆 */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-black text-slate-800 tracking-wider mb-4 flex items-center">
            🙏 今日守望代禱牆
          </h3>
          <div className="space-y-3">
            {prayers.map((p) => (
              <div key={p.id} className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/70 space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${p.tag === '緊急代禱' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                    {p.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{p.time}</span>
                </div>
                <p className="text-xs font-bold text-slate-700 leading-relaxed">
                  {p.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
