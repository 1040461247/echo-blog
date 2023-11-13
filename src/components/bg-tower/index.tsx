import { memo } from 'react'
import styles from './styles.module.scss'
import useParallax from '@/hooks/parallax'
// Import Types
import type { FC } from 'react'
import type { IOption } from '@/hooks/parallax'

const BgTower: FC<IProps> = memo(() => {
  const parallax = useParallax()!
  const firstTowersOption: IOption = {
    speed: -3,
    isTransparent: true,
    startShowPct: 0.4,
    solidPct: 0.9
  }
  const secondTowersOption: IOption = {
    speed: 4
  }

  return (
    <section className={styles['bg-tower']}>
      <article className={styles['left']}>
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img src="/images/common/bgBuilding1.png" alt="tower1" />
        </div>
        <div className="second-tower" ref={(elRef) => parallax(elRef, secondTowersOption)}>
          <img src="/images/common/bgBuilding2.png" alt="tower2" />
        </div>
      </article>

      <article className={styles['right']}>
        <div className="first-tower" ref={(elRef) => parallax(elRef, firstTowersOption)}>
          <img src="/images/common/bgBuilding3.png" alt="tower3" />
        </div>
        <div className="second-tower" ref={(elRef) => parallax(elRef, secondTowersOption)}>
          <img src="/images/common/bgBuilding4.png" alt="tower4" />
        </div>
      </article>
    </section>
  )
})

export default BgTower
BgTower.displayName = 'BgTower'

// Types
export interface IProps {
  children?: React.ReactElement
}
