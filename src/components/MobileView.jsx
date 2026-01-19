import React from 'react'
import LiteApp from '../lite/LiteApp'

const MobileView = () => {
  return (
    <div className="flex flex-1 justify-center items-center bg-slate-100 py-10">
      <div className="phone-case">
        <div className="dynamic-island"></div>
        <div className="screen">
          <LiteApp />
        </div>
      </div>
    </div>
  )
}

export default MobileView
