import React from 'react'

const ViewSwitcher = ({ currentView, setCurrentView }) => {
  return (
    <div className="view-switcher">
      <button
        onClick={() => setCurrentView('pc')}
        className={`view-btn ${currentView === 'pc' ? 'active' : ''}`}
      >
        管理后台
      </button>
      <button
        onClick={() => setCurrentView('wecom')}
        className={`view-btn ${currentView === 'wecom' ? 'active' : ''}`}
      >
        企微侧边栏
      </button>
      <button
        onClick={() => setCurrentView('mobile')}
        className={`view-btn ${currentView === 'mobile' ? 'active' : ''}`}
      >
        学员端
      </button>
    </div>
  )
}

export default ViewSwitcher
