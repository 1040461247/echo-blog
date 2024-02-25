'use client'

import type { IOption } from '@/hooks/use-parallax'
import useParallax from '@/hooks/use-parallax'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  className?: string
}

const BgTowerV1: FC<IProps> = memo(({ className }) => {
  const parallax = useParallax()!
  const firstTowersOption: IOption = {
    speed: -3.5,
    isTransparent: true,
    startShowPct: 0.3,
    solidPct: 0.6,
    adapter: {
      sm: {
        speed: -2.5,
      },
      lg: {
        speed: -1.5,
      },
      xl: {
        speed: -1,
      },
    },
  }
  const secondTowersOption: IOption = {
    speed: 3,
    adapter: {
      md: {
        speed: 4,
      },
    },
  }

  const secondTowerStyle = `mt-[35vh] md:mt-0 lg:mt-[-35vh] 2xl:mt-[-70vh]`

  return (
    <div className={`overflow-hidden absolute inset-0 -z-50 ${className}`}>
      {/* Left Towers */}
      <section className="absolute inset-y-0 left-0 w-4/12">
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding1.png" alt="tower" />
        </div>
        <div
          className={`second-tower ${secondTowerStyle}`}
          ref={(elRef) => parallax(elRef, secondTowersOption)}
        >
          <img className="w-full" src="/images/bg-tower/bgBuilding2.png" alt="tower" />
        </div>
      </section>

      {/* Right Towers */}
      <section className="absolute inset-y-0 right-0 w-4/12">
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding3.png" alt="tower" />
        </div>
        <div
          className={`second-tower ${secondTowerStyle}`}
          ref={(elRef) => parallax(elRef, secondTowersOption)}
        >
          <img className="w-full" src="/images/bg-tower/bgBuilding4.png" alt="tower" />
        </div>
      </section>
    </div>
  )
})

export default BgTowerV1
BgTowerV1.displayName = 'BgTower'
