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

  const secondTowerStyle = `mt-[120vh] xl:mt-[50vh]`

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
