'use client'

import { memo } from 'react'
import useParallax from '@/hooks/parallax'
import type { FC } from 'react'
import type { IOption } from '@/hooks/parallax'

// Types
export interface IProps {
  children?: React.ReactElement
}

const BgTowerV2: FC<IProps> = memo(() => {
  const parallax = useParallax()

  const parallaxOption: IOption = {
    speed: -4,
    isTransparent: true,
    startShowPct: 0.3,
    solidPct: 0.8
  }

  return (
    <div className="bg-tower-v2 absolute inset-0">
      <img
        className="absolute inset-x-0 bottom-0 mx-auto w-2/3 xs:w-1/2 sm:w-1/3 md:w-1/4"
        src="/images/bg-tower/GuangzhouTower.png"
        alt="guangzhou-tower"
        ref={(el) => parallax!(el, parallaxOption)}
      />
    </div>
  )
})

export default BgTowerV2
BgTowerV2.displayName = 'BgTowerV2'
