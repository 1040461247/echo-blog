'use client'

import useParallax, { IOption as IParallaxOption } from '@/hooks/use-parallax'
import { memo } from 'react'
import Image from 'next/image'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMainAstronaut: FC<IProps> = memo(() => {
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
    <div className="absolute inset-x-0 bottom-0">
      {/* Astronaut Area */}
      <div
        className="absolute bottom-[-10vw] sm:bottom-0 md:bottom-[1vw] lg:bottom-[5vw] xl:bottom-[3vw] inset-x-0 mx-auto w-5/6 sm:w-4/6 md:w-7/12 lg:w-1/2"
        ref={(elRef) => parallax(elRef, parallaxOption)}
      >
        {/* Astronaut Mask */}
        <div className="overflow-hidden absolute top-[3.5vw] inset-0 bottom-0 mx-auto w-1/2 h-1/2">
          <Image
            className="absolute bottom-0 w-full"
            src="/images/home/astronaut-sta.png"
            width={0}
            height={0}
            alt="universe"
            sizes="100vw"
            ref={(elRef) => parallax(elRef, parallaxOption)}
          />
        </div>

        {/* Astronaut */}
        <Image
          className="relative w-full"
          src="/images/home/astronaut.png"
          width={0}
          height={0}
          alt="astronaut"
          sizes="100vw"
          priority
        />
      </div>

      {/* Bottom Frame Area */}
      <div className="relative">
        <Image
          className="w-full"
          src="/images/home/mask.png"
          width={0}
          height={0}
          alt="mask"
          sizes="100vw"
        />
      </div>
    </div>
  )
})

export default HomeMainAstronaut
HomeMainAstronaut.displayName = 'HomeMainAstronaut'
