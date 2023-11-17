import { memo } from 'react'
import useParallax from '@/hooks/parallax'
import type { FC } from 'react'
import type { IOption } from '@/hooks/parallax'

// Types
export interface IProps {
  children?: React.ReactElement
}

const BgTower: FC<IProps> = memo(() => {
  const parallax = useParallax()!
  const firstTowersOption: IOption = {
    speed: -4,
    isTransparent: true,
    startShowPct: 0.3,
    solidPct: 0.6,
    adapter: {
      sm: {
        speed: -3
      },
      lg: {
        speed: -2
      },
      xl: {
        speed: -1
      }
    }
  }
  const secondTowersOption: IOption = {
    speed: 6,
    adapter: {
      md: {
        speed: 7
      },
      lg: {
        speed: 8
      },
      xl: {
        speed: 10
      }
    }
  }

  return (
    <section className="overflow-hidden absolute inset-0 -z-50">
      {/* Left Towers */}
      <article className="absolute inset-y-0 left-0 w-4/12">
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding1.png" alt="tower" />
        </div>
        <div className="second-tower" ref={(elRef) => parallax(elRef, secondTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding2.png" alt="tower" />
        </div>
      </article>

      {/* Right Towers */}
      <article className="absolute inset-y-0 right-0 w-4/12">
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding3.png" alt="tower" />
        </div>
        <div className="second-tower" ref={(elRef) => parallax(elRef, secondTowersOption)}>
          <img className="w-full" src="/images/bg-tower/bgBuilding4.png" alt="tower" />
        </div>
      </article>
    </section>
  )
})

export default BgTower
BgTower.displayName = 'BgTower'
