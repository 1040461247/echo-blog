'use client'

import useParallax from '@/hooks/use-parallax'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMain: FC<IProps> = memo(() => {
  const parallax = useParallax()!

  return (
    <div className="home-main overflow-hidden relative h-[calc(100vh+31.25vw)] bg-[--bg-light-blue]">
      {/* Main Content */}
      <main className="flex justify-center items-center h-[100vh]">
        <div className="big-word-art text-[#1d1e2c] text-[4.1667vw] font-black text-center rotate-[-8deg] translate-y-[-11vh] [text-shadow:_-0.2083vw_0.2083vw_var(--primary-color)]">
          <span className="block text-left">你好啊，我是Cheems</span>
          <span className="block text-center text-[9.2917vw]">一名软件开发工程师</span>
          <span className="block text-right">很高兴认识你^_^</span>
        </div>
      </main>

      {/* Astronaut Frame */}
      <div className="absolute inset-x-0 bottom-0">
        {/* Astronaut Area */}
        <div
          className="absolute bottom-[3vw] sm:bottom-[0.5vw] md:bottom-[-1.5vw] lg:bottom-[-3vw] xl:bottom-[-4vw] inset-x-0 mx-auto w-1/2"
          ref={(elRef) => parallax(elRef)}
        >
          {/* Astronaut Mask */}
          <div className="overflow-hidden absolute top-[1.8229vw] inset-0 bottom-0 mx-auto w-1/2 h-1/2">
            <img
              className="absolute bottom-0 w-full"
              src="/images/home/astronaut-sta.png"
              alt="universe"
              ref={(elRef) => parallax(elRef)}
            />
          </div>

          {/* Astronaut */}
          <img className="relative w-full" src="/images/home/astronaut.png" alt="astronaut" />
        </div>

        {/* Bottom Frame Area */}
        <div className="relative">
          <img className="w-full" src="/images/home/Mask.png" alt="mask" />
        </div>
      </div>
    </div>
  )
})

export default HomeMain
HomeMain.displayName = 'HomeMain'
