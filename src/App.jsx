import React, { useState } from 'react'
import PCView from './components/PCView'
import WecomView from './components/WecomView'
import MobileView from './components/MobileView'
import ViewSwitcher from './components/ViewSwitcher'

function App() {
  const [currentView, setCurrentView] = useState('pc')

  return (
    <div className="flex h-screen overflow-hidden">
      {currentView === 'pc' && <PCView />}
      {currentView === 'wecom' && <WecomView />}
      {currentView === 'mobile' && <MobileView />}
      <ViewSwitcher currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  )
}

export default App
