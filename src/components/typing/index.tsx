'use client'

import React, { useEffect, useRef, useState } from 'react'

// Types
export interface IProps {
  text: string
  speed?: number
}

const Typing: React.FC<IProps> = ({ text, speed = 150 }) => {
  const typeIndex = useRef(0)
  const [showText, setShowText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeIndex.current < text.length) {
        setShowText(showText + text[typeIndex.current])
        typeIndex.current += 1
      } else {
        clearTimeout(timer)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [showText])

  return (
    <div className="typing">
      {showText}
      {showText.length !== text.length && <span className="animate-blink">|</span>}
    </div>
  )
}

export default Typing
