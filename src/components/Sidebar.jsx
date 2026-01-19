import React, { useState } from 'react'

const Sidebar = ({ currentPage, onPageChange }) => {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: 'home', icon: 'fa-th-large', label: '首页看板' },
    { id: 'student', icon: 'fa-users', label: '学员管理' },
    { id: 'task', icon: 'fa-tasks', label: '任务管理' },
    { id: 'performance', icon: 'fa-chart-bar', label: '我的绩效' },
    { id: 'plan', icon: 'fa-book', label: '复习规划' },
  ]

  return (
    <aside id="sidebar" className={`w-64 flex flex-col transition-all duration-300 relative ${collapsed ? 'collapsed' : ''}`}>
      <div id="sidebar-header" className="p-8 flex items-center gap-3 relative">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/50 flex-shrink-0">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <span className="text-white font-black text-xl tracking-tighter sidebar-text">考研二讲工作台</span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:bg-blue-50 transition-colors z-10"
        >
          <i className={`fas fa-chevron-left text-xs sidebar-toggle-icon ${collapsed ? 'rotate-180' : ''}`}></i>
        </button>
      </div>
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`sidebar-item flex items-center gap-4 px-6 py-4 cursor-pointer ${
              currentPage === item.id ? 'nav-active' : ''
            }`}
          >
            <i className={`fas ${item.icon} w-5 flex-shrink-0`}></i>
            <span className="font-semibold text-sm sidebar-text">{item.label}</span>
          </div>
        ))}
      </nav>
      <div id="sidebar-footer" className="m-6 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
        <img src="/avatar.jpeg" className="w-9 h-9 rounded-xl flex-shrink-0" alt="avatar" />
        <div className="overflow-hidden sidebar-text">
          <p className="text-white text-xs font-bold truncate">张三</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
