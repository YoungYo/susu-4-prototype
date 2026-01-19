import React from 'react'

const HomePage = ({ onNavigate }) => {

  return (
    <div className="animate-up">
      <div className="welcome-banner p-10 text-white flex justify-between items-center mb-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-1">下午好，张三老师！👋</h1>
          <p className="text-white/60 text-sm font-medium">
            今天有 <span className="text-white underline">24</span> 项待办任务需要跟进。
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-center">
            <p className="text-[9px] font-black opacity-50 uppercase mb-1">距离 27 考研</p>
            <p className="text-xl font-black">706 <span className="text-xs font-normal opacity-50">天</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-center">
            <p className="text-[9px] font-black opacity-50 uppercase mb-1">距离 28 考研</p>
            <p className="text-xl font-black">1072 <span className="text-xs font-normal opacity-50">天</span></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <div className="glass-card p-6 rounded-3xl cursor-pointer" onClick={() => onNavigate && onNavigate('task')}>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">今日待办数量</p>
          <h2 className="text-4xl font-black text-slate-800 mb-6">24</h2>
          <div className="flex justify-between text-[10px] font-bold mb-1">
            <span className="text-red-500">P0 紧急占比</span><span>15%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: '15%' }}></div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl cursor-pointer" onClick={() => onNavigate && onNavigate('student')}>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">当前带班量</p>
          <h2 className="text-4xl font-black text-slate-800 mb-6">482</h2>
          <div className="flex gap-2">
            <div className="flex-1 bg-blue-50 p-2 rounded-xl text-center">
              <p className="text-[9px] text-blue-400 font-bold">27届</p>
              <p className="text-xs font-black text-blue-700">85%</p>
            </div>
            <div className="flex-1 bg-indigo-50 p-2 rounded-xl text-center">
              <p className="text-[9px] text-indigo-400 font-bold">28届</p>
              <p className="text-xs font-black text-indigo-700">15%</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl border-red-100 cursor-pointer">
          <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-4">退费风险人数</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-4xl font-black text-red-600">12</h2>
            <span className="text-[10px] text-red-400 font-bold">↑ 2</span>
          </div>
          <p className="text-[9px] text-slate-400 leading-relaxed">检测到近期完课率波动的学员。</p>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">平均完课率</p>
          <h2 className="text-4xl font-black text-green-600 mb-6">78.5%</h2>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '78.5%' }}></div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">本月业绩</p>
          <h2 className="text-2xl font-black text-slate-800 mb-2">¥82,400</h2>
          <p className="text-[9px] text-slate-400 mb-3 font-bold uppercase tracking-tighter">目标：120,000</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 h-1 rounded-full">
              <div className="bg-blue-600 h-full" style={{ width: '68%' }}></div>
            </div>
            <span className="text-[9px] font-black text-blue-600">68%</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">今日通时</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-4xl font-black text-purple-600">85</h2>
            <span className="text-xs text-slate-400 font-bold">min</span>
          </div>
          <p className="text-[9px] text-slate-400 mb-3 font-bold uppercase tracking-tighter">目标：100 min</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 h-1 rounded-full">
              <div className="bg-purple-600 h-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-[9px] font-black text-purple-600">85%</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">今日有效通次</p>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-4xl font-black text-cyan-600">8</h2>
            <span className="text-xs text-slate-400 font-bold">次</span>
          </div>
          <p className="text-[9px] text-slate-400 mb-3 font-bold uppercase tracking-tighter">目标：10 次</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 h-1 rounded-full">
              <div className="bg-cyan-600 h-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-[9px] font-black text-cyan-600">80%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
