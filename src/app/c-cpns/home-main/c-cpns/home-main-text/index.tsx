'use client'

import useScroll from '@/hooks/use-scroll'
import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMainText: FC<IProps> = memo(() => {
  // 打字效果
  const typeText = '一名软件开发攻城狮'
  const typeSpeed = 150
  const typeIndex = useRef(0)
  const [showText, setShowText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeIndex.current < typeText.length) {
        setShowText(showText + typeText[typeIndex.current])
        typeIndex.current += 1
      } else {
        clearTimeout(timer)
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [showText])

  // 触发角标文字入场动画
  const [showSubText, setShowSubText] = useState(false)
  useEffect(() => {
    setShowSubText(true)
    return () => setShowSubText(false)
  }, [])

  // 角标文字偏移
  const { scrollY } = useScroll()
  const speed = 1.3

  return (
    <div className="home-main-text flex justify-center items-center h-[110vh]">
      <div className="home-main-text-inner w-full px-5 text-[#1d1e2c] font-black text-center rotate-[-8deg] translate-y-[-11vh] [text-shadow:_-0.2083vw_0.2083vw_var(--primary-color)]">
        <div
          className={`text-left text-[4.5vw] transition-transform duration-1000 ease-out`}
          style={{
            transform: `translate3D(${showSubText ? `${-(scrollY * speed)}px` : '-100%'}, 0, 0)`
          }}
        >
          你好啊，我是Cheems
        </div>

        <div className="my-1 text-center text-[9.5vw]">
          {showText}
          {showText.length !== typeText.length && <span className="animate-blink">|</span>}
        </div>

        <div
          className={`text-right text-[4.5vw] transition-transform duration-1000 ease-out ${
            showSubText ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transform: `translate3D(${showSubText ? `${scrollY * speed}px` : '100%'}, 0, 0)`
          }}
        >
          很高兴认识你^_^
        </div>
      </div>
    </div>
  )
})

export default HomeMainText
HomeMainText.displayName = 'HomeMainText'
