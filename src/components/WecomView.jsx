import React from 'react'

const WecomView = () => {
  return (
    <div className="flex flex-1 justify-center items-center bg-slate-200">
      <div className="w-[360px] h-screen bg-white shadow-2xl flex flex-col border-x">
        <div className="p-3 bg-slate-50 border-b flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500">学员详情 · 李萌萌</span>
          <i className="fas fa-times text-slate-300 cursor-pointer"></i>
        </div>
        <div className="p-5 flex items-center gap-4 border-b">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">李</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">李萌萌</span>
              <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded font-black">退费风险</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">ID: 98721 | 清华大学-计算机</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex border-b text-xs sticky top-0 bg-white z-10">
            <div className="flex-1 py-3 text-center border-b-2 border-blue-600 text-blue-600 font-bold">TODO</div>
            <div className="flex-1 py-3 text-center text-slate-400">计划</div>
            <div className="flex-1 py-3 text-center text-slate-400">打卡</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
              <p className="text-xs font-bold text-orange-800">修改高数基础学习计划</p>
              <p className="text-[9px] text-orange-400 mt-1">截止：今日 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WecomView
