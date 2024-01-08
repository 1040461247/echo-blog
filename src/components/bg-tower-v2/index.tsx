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
    speed: -8,
    isTransparent: true,
    startShowPct: 0.7,
    solidPct: 0.9,
    adapter: {
      xs: {
        speed: -7
      },
      sm: {
        speed: -6
      },
      md: {
        speed: -5
      },
      lg: {
        speed: -4
      },
      xl: {
        speed: -3
      }
    }
  }

  return (
    <div className="bg-tower-v2 overflow-hidden absolute inset-0">
      <img
        className="opacity-0 absolute right-0 left-1 top-[30vh] w-2/3 sm:w-1/2 md:w-2/5 lg:w-2/6 xl:w-1/4 mx-auto"
        src="/images/bg-tower/GuangzhouTower.png"
        alt="guangzhou-tower"
        ref={(el) => parallax!(el, parallaxOption)}
      />
    </div>
  )
})

export default BgTowerV2
BgTowerV2.displayName = 'BgTowerV2'
