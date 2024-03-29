'use client'

import Typing from '@/components/typing'
import useScroll from '@/hooks/use-scroll'
import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMainText: FC<IProps> = memo(() => {
  // 触发角标文字入场动画
  const [showSubText, setShowSubText] = useState(false)
  useEffect(() => {
    setShowSubText(true)
    return () => setShowSubText(false)
  }, [])

  // 角标文字偏移
  const { scrollY } = useScroll()
  const speed = 1.3

  // 当元素在屏幕外时，停止角标偏移
  const textWrapRef = useRef<HTMLDivElement>(null)
  const [isInner, setIsInner] = useState(true)
  useEffect(() => {
    if (textWrapRef.current) {
      const { bottom } = textWrapRef.current.getBoundingClientRect()
      bottom <= 0 ? setIsInner(false) : setIsInner(true)
    }
  }, [scrollY])

  return (
    <div className="home-main-text flex justify-center items-center h-[110vh]" ref={textWrapRef}>
      <div className="home-main-text-inner w-full px-5 text-[#1d1e2c] font-black text-center rotate-[-8deg] translate-y-[-11vh] [text-shadow:_-0.2083vw_0.2083vw_var(--primary-color)]">
        <div
          className={`text-left text-[4.5vw] transition-transform duration-1000 ease-out`}
          style={{
            transform: `translate3D(${
              showSubText && isInner ? `${-(scrollY * speed)}px` : '-100%'
            }, 0, 0)`,
          }}
        >
          你好啊，我是Cheems
        </div>

        <div className="my-1 text-center text-[9.5vw]">
          <Typing text="一名Web开发工程师" />
        </div>

        <div
          className={`text-right text-[4.5vw] transition-transform duration-1000 ease-out ${
            showSubText ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transform: `translate3D(${showSubText ? `${scrollY * speed}px` : '100%'}, 0, 0)`,
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
