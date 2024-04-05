import React from 'react'

const Subscript: React.FC<{
  children: React.ReactElement
}> = ({ children }) => {
  return (
    <div className="absolute top-0 right-0 z-10 overflow-hidden flex items-end justify-center w-14 h-6 bg-[--primary-color] translate-x-1/3 rotate-45 text-xs shadow">
      {children}
    </div>
  )
}

export default Subscript
