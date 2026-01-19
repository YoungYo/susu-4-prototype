import React from 'react'

const PerformancePage = () => {
  return (
    <div className="animate-up">
      {/* 正向指标 */}
      <div className="mb-8">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <i className="fas fa-arrow-up text-green-600"></i> 正向指标
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {/* 业绩 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">业绩</p>
              <i className="fas fa-yen-sign text-blue-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">¥82,400</p>
              <p className="text-xs text-slate-400">目标：¥120,000</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: '68.7%' }}></div>
            </div>
            <p className="text-xs text-blue-600 font-bold mt-2">完成率：68.7%</p>
          </div>

          {/* 亲密度 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">亲密度</p>
              <i className="fas fa-heart text-pink-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">85</p>
              <p className="text-xs text-slate-400">满分：100</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-pink-600 h-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-pink-600 font-bold mt-2">优秀</p>
          </div>

          {/* 非工作时间回复时效 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">非工作时间回复时效</p>
              <i className="fas fa-clock text-purple-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">15</p>
              <p className="text-xs text-slate-400">分钟 32 秒</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-purple-600 font-bold mt-2">良好</p>
          </div>

          {/* 工作时间回复时效 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">工作时间回复时效</p>
              <i className="fas fa-clock text-indigo-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">8</p>
              <p className="text-xs text-slate-400">分钟 15 秒</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-xs text-indigo-600 font-bold mt-2">优秀</p>
          </div>

          {/* 非工作日首call率 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">非工作日首call率</p>
              <i className="fas fa-phone text-teal-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">92.5%</p>
              <p className="text-xs text-slate-400">目标：90%</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full" style={{ width: '92.5%' }}></div>
            </div>
            <p className="text-xs text-teal-600 font-bold mt-2">超额完成</p>
          </div>

          {/* 工作日首call率 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">工作日首call率</p>
              <i className="fas fa-phone text-cyan-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">96.8%</p>
              <p className="text-xs text-slate-400">目标：95%</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-600 h-full" style={{ width: '96.8%' }}></div>
            </div>
            <p className="text-xs text-cyan-600 font-bold mt-2">超额完成</p>
          </div>

          {/* 新生加微率 */}
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">新生加微率</p>
              <i className="fas fa-user-plus text-emerald-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-slate-800 mb-1">88.3%</p>
              <p className="text-xs text-slate-400">目标：85%</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full" style={{ width: '88.3%' }}></div>
            </div>
            <p className="text-xs text-emerald-600 font-bold mt-2">超额完成</p>
          </div>
        </div>
      </div>

      {/* 负向指标 */}
      <div className="mb-8">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <i className="fas fa-arrow-down text-red-600"></i> 负向指标
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {/* 退费率 */}
          <div className="glass-card p-6 rounded-3xl border-red-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">退费率</p>
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-red-600 mb-1">2.5%</p>
              <p className="text-xs text-slate-400">目标：&lt;3%</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full" style={{ width: '83.3%' }}></div>
            </div>
            <p className="text-xs text-red-600 font-bold mt-2">达标</p>
          </div>
        </div>
      </div>

      {/* 额外加减分项 */}
      <div>
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          <i className="fas fa-star text-yellow-600"></i> 额外加减分项
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {/* 好评 */}
          <div className="glass-card p-6 rounded-3xl border-green-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">好评</p>
              <i className="fas fa-thumbs-up text-green-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-green-600 mb-1">+12</p>
              <p className="text-xs text-slate-400">本月获得</p>
            </div>
            <p className="text-xs text-green-600 font-bold">加分项</p>
          </div>

          {/* 承接换二讲 */}
          <div className="glass-card p-6 rounded-3xl border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">承接换二讲</p>
              <i className="fas fa-handshake text-blue-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-blue-600 mb-1">+5</p>
              <p className="text-xs text-slate-400">本月承接</p>
            </div>
            <p className="text-xs text-blue-600 font-bold">加分项</p>
          </div>

          {/* 换二讲 */}
          <div className="glass-card p-6 rounded-3xl border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">换二讲</p>
              <i className="fas fa-exchange-alt text-orange-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-orange-600 mb-1">-2</p>
              <p className="text-xs text-slate-400">本月发生</p>
            </div>
            <p className="text-xs text-orange-600 font-bold">减分项</p>
          </div>

          {/* 客诉 */}
          <div className="glass-card p-6 rounded-3xl border-red-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">客诉</p>
              <i className="fas fa-exclamation-circle text-red-600"></i>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-black text-red-600 mb-1">-1</p>
              <p className="text-xs text-slate-400">本月发生</p>
            </div>
            <p className="text-xs text-red-600 font-bold">减分项</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformancePage
