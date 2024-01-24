'use client'

import useParallax, { IOption as IParallaxOption } from '@/hooks/use-parallax'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMain: FC<IProps> = memo(() => {
  const parallax = useParallax()!
  const parallaxOption: IParallaxOption = {
    speed: -3,
    adapter: {
      xs: {
        speed: -4
      },
      sm: {
        speed: -4
      },
      md: {
        speed: -4
      }
    }
  }

  return (
    <div className="home-main overflow-hidden relative h-[calc(100vh+45vw)] md:h-[calc(100vh+40vw)] bg-[--bg-light-blue]">
      {/* Main Content */}
      <div className="flex justify-center items-center h-[110vh]">
        <div className="big-word-art text-[#1d1e2c] text-[5vw] font-black text-center rotate-[-8deg] translate-y-[-11vh] [text-shadow:_-0.2083vw_0.2083vw_var(--primary-color)]">
          <span className="block text-left">你好啊，我是Cheems</span>
          <span className="block text-center text-[10.7vw]">一名软件开发工程师</span>
          <span className="block text-right">很高兴认识你^_^</span>
        </div>
      </div>

      {/* Astronaut Frame */}
      <div className="absolute inset-x-0 bottom-0">
        {/* Astronaut Area */}
        <div
          className="absolute bottom-[-10vw] sm:bottom-0 md:bottom-[1vw] lg:bottom-[5vw] xl:bottom-[3vw] inset-x-0 mx-auto w-5/6 sm:w-4/6 md:w-7/12 lg:w-1/2"
          ref={(elRef) => parallax(elRef, parallaxOption)}
        >
          {/* Astronaut Mask */}
          <div className="overflow-hidden absolute top-[3.5vw] inset-0 bottom-0 mx-auto w-1/2 h-1/2">
            <img
              className="absolute bottom-0 w-full"
              src="/images/home/astronaut-sta.png"
              alt="universe"
              ref={(elRef) => parallax(elRef, parallaxOption)}
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
