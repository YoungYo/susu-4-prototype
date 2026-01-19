import React, { useState } from 'react'
import Sidebar from './Sidebar'
import HomePage from './pages/HomePage'
import StudentPage from './pages/StudentPage'
import TaskPage from './pages/TaskPage'
import PerformancePage from './pages/PerformancePage'
import PlanPage from './pages/PlanPage'

const PCView = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const pageTitles = {
    home: '首页看板',
    student: '学员管理',
    task: '任务管理',
    performance: '我的绩效',
    plan: '复习规划',
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'student':
        return <StudentPage />
      case 'task':
        return <TaskPage />
      case 'performance':
        return <PerformancePage />
      case 'plan':
        return <PlanPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  const getCurrentDate = () => {
    const date = new Date()
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className="flex flex-1 w-full">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <header className="h-16 flex items-center justify-between px-10 bg-white/50 backdrop-blur-md border-b">
          <h2 className="text-lg font-bold text-slate-800">{pageTitles[currentPage]}</h2>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>{getCurrentDate()}</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default PCView
