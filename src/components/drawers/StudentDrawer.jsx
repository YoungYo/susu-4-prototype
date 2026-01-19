import React, { useState, useEffect, useRef } from 'react'

const StudentDrawer = ({ student, onClose }) => {
  const [activeTab, setActiveTab] = useState('todo')
  const drawerRef = useRef(null)
  const resizerRef = useRef(null)

  if (!student) return null

  // 初始化拖拽功能
  useEffect(() => {
    if (!drawerRef.current || !resizerRef.current) return

    const drawer = drawerRef.current
    const resizer = resizerRef.current
    let isResizing = false
    let startX = 0
    let startWidth = 0

    const handleMouseDown = (e) => {
      isResizing = true
      startX = e.clientX
      startWidth = drawer.offsetWidth
      drawer.classList.add('resizing')
      resizer.classList.add('dragging')
      document.body.style.cursor = 'ew-resize'
      e.preventDefault()
    }

    const handleMouseMove = (e) => {
      if (!isResizing) return
      const diff = startX - e.clientX
      const newWidth = startWidth + diff
      const minWidth = 400
      const maxWidth = window.innerWidth * 0.9

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        drawer.style.width = newWidth + 'px'
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        isResizing = false
        drawer.classList.remove('resizing')
        resizer.classList.remove('dragging')
        document.body.style.cursor = ''
      }
    }

    resizer.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      resizer.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div className="drawer-overlay show" onClick={onClose}></div>
      <div ref={drawerRef} className="drawer show">
        <div ref={resizerRef} className="drawer-resizer"></div>
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
