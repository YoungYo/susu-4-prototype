import React, { useState } from 'react'

const StudentDrawer = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState('todo')

  if (!student) return null

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer show">
        <div className="drawer-header">
          <span className="text-xs font-bold text-slate-500">
            学员详情 · {student.name}
          </span>
          <i
            className="fas fa-times text-slate-300 cursor-pointer hover:text-slate-500"
            onClick={onClose}
          ></i>
        </div>
        <div className="drawer-body">
          <div className="p-5 flex items-center gap-4 border-b">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{student.name}</span>
                <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded font-black">
                  退费风险
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                ID: {student.id} | {student.target}
              </p>
            </div>
          </div>
          <div className="flex border-b text-xs sticky top-0 bg-white z-10">
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'todo'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('todo')}
            >
              TODO
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'plan'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('plan')}
            >
              学习计划
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'checkin'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('checkin')}
            >
              打卡记录
            </div>
            <div
              className={`flex-1 py-3 text-center cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              备注
            </div>
          </div>
          <div className="p-4">
            {activeTab === 'todo' && (
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 rounded-xl border-l-4 border-orange-400">
                  <p className="text-xs font-bold text-orange-800">修改高数基础学习计划</p>
                  <p className="text-[9px] text-orange-400 mt-1">截止：今日 18:00</p>
                </div>
              </div>
            )}
            {activeTab === 'plan' && (
              <div>
                <p className="text-slate-400 text-sm">学习计划内容</p>
              </div>
            )}
            {activeTab === 'checkin' && (
              <div className="text-center py-8 text-slate-400 text-sm">
                <i className="fas fa-calendar-check text-3xl mb-3"></i>
                <p>打卡记录功能开发中</p>
              </div>
            )}
            {activeTab === 'notes' && (
              <div>
                <p className="text-slate-400 text-sm">备注内容</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentDrawer
