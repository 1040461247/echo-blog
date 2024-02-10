'use client'

import type { IOption } from '@/hooks/use-parallax'
import useParallax from '@/hooks/use-parallax'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const BgTowerV2: FC<IProps> = memo(() => {
  const parallax = useParallax()

  const parallaxOption: IOption = {
    speed: -9,
    isTransparent: true,
    startShowPct: 0.7,
    solidPct: 0.9,
    animation: false,
    adapter: {
      lg: {
        speed: -8.5
      }
    }
  }

  return (
    <div className="bg-tower-v2 overflow-hidden absolute inset-0">
      <img
        className="absolute right-0 left-1 top-[30vh] w-2/3 sm:w-1/2 md:w-2/5 lg:w-2/6 xl:w-1/4 mx-auto"
        src="/images/bg-tower/GuangzhouTower.png"
        alt="guangzhou-tower"
        ref={(el) => parallax!(el, parallaxOption)}
      />
    </div>
  )
})

export default BgTowerV2
BgTowerV2.displayName = 'BgTowerV2'
