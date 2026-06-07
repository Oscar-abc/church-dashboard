import React from 'react';

function Dashboard() {
  // 模擬 image_67a8fe.jpg 的 10 顆卡片數據
  const kpiCards = [
    { title: '弟兄新員', percent: 1, current: '1', total: '200', color: 'border-blue-500 text-blue-500' },
    { title: '弟兄會費', percent: 14, current: '229', total: '1,597', color: 'border-blue-600 text-blue-600' },
    { title: '弟兄聖奉', percent: 0, current: '4K', total: '6,467K', color: 'border-slate-400 text-slate-400' },
    { title: '教會見證 (含已安排)', percent: 22, current: '177', total: '797', color: 'border-purple-600 text-purple-600' },
    { title: '贈送聖經', percent: 0, current: '642', total: '259,388', color: 'border-slate-400 text-slate-400' },
    { title: '姊妹新員', percent: 1, current: '1', total: '132', color: 'border-pink-500 text-pink-500' },
    { title: '姊妹會費', percent: 20, current: '226', total: '1,139', color: 'border-pink-600 text-pink-600' },
    { title: '姊妹聖奉', percent: 0, current: '0', total: '1,585K', color: 'border-slate-400 text-slate-400' },
    { title: '教會聖奉', percent: 0, current: '500', total: '14,663K', color: 'border-emerald-500 text-emerald-500' },
    { title: '姊妹贈經', percent: 0, current: '0', total: '34,060', color: 'border-slate-400 text-slate-400' },
  ];

  return (
    <div className="space-y-6">
      {/* A. 篩選工具列 */}
      <div className="flex flex-wrap justify-between items-center bg-[#F8F6F0] p-4 rounded-xl border border-gray-200/60 shadow-sm">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">全國目標達成率</h2>
          <div className="flex space-x-2 text-xs text-gray-600">
            <select className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm"><option>2027 年度</option></select>
            <select className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm"><option>全部區域</option></select>
            <select className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm"><option>選擇支會</option></select>
          </div>
        </div>
        <div className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-md font-medium">
          📅 結帳日：2026-06-06
        </div>
      </div>

      {/* B. 10 顆 KPI 數據卡片網格 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpiCards.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-xs font-bold text-gray-500 mb-3">{card.title}</span>
            
            {/* 純 CSS 圓環進度條效果，穩定且不吃外部套件 */}
            <div className={`relative w-20 h-20 mb-3 rounded-full border-4 flex items-center justify-center ${card.color.split(' ')[0]}`}>
              <span className="text-sm font-black text-slate-700">{card.percent}%</span>
            </div>

            <div className="mt-1">
              <span className={`block text-lg font-bold leading-none ${card.color.split(' ')[1]}`}>{card.current}</span>
              <span className="text-[10px] text-gray-400 font-medium">/ {card.total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* C. 各區域達成明細表格 */}
      <div className="bg-[#0B1E2D] rounded-xl shadow-lg overflow-hidden border border-slate-800">
        <div className="p-4 bg-slate-900/60 flex justify-between items-center border-b border-slate-800">
          <h3 className="text-white font-bold text-sm tracking-wide">各區域達成明細</h3>
          <span className="text-xs text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/30">資料即時連線中</span>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-gray-400 border-b border-slate-800">
                <th className="p-3">區域</th>
                <th className="p-3 text-blue-400">弟兄年初</th>
                <th className="p-3 text-blue-400">弟兄目標</th>
                <th className="p-3 text-pink-400">姊妹年初</th>
                <th className="p-3 text-pink-400">姊妹目標</th>
                <th className="p-3 text-amber-400">會費(弟/姊)</th>
                <th className="p-3 text-emerald-400">教會奉獻成果</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 divide-y divide-slate-800/50">
              <tr className="hover:bg-slate-800/40 transition">
                <td className="p-3 font-bold text-white">❯ 北特</td>
                <td className="p-3 text-blue-400">330</td>
                <td className="p-3">36</td>
                <td className="p-3 text-pink-400">208</td>
                <td className="p-3">24</td>
                <td className="p-3">40 / 47</td>
                <td className="p-3 text-emerald-400 font-bold">5,412,000</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="p-3 font-bold text-white">❯ 中區</td>
                <td className="p-3 text-blue-400">185</td>
                <td className="p-3">20</td>
                <td className="p-3 text-pink-400">142</td>
                <td className="p-3">15</td>
                <td className="p-3">22 / 31</td>
                <td className="p-3 text-emerald-400 font-bold">2,150,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
