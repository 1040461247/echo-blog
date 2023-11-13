'use client'

import { memo } from 'react'
import './index.scss'
import useParallax from '@/hooks/parallax'
// Types import
import type { FC } from 'react'

const HomeMain: FC<IProps> = memo(() => {
  const parallax = useParallax()!

  return (
    <section className="home-main">
      <div className="content">
        <div className="title">
          <span className="sup">你好啊，我是Cheems</span>
          <span className="center">一名软件开发工程师</span>
          <span className="sub">很高兴认识你^_^</span>
        </div>
      </div>

      <div className="bottom">
        <div className="astronaut" ref={(elRef) => parallax(elRef)}>
          <div className="astronaut-mask">
            <img
              className="img-sta"
              src="/images/home/astronaut-sta.png"
              alt="universe"
              ref={(elRef) => parallax(elRef)}
            />
          </div>
          <img className="img-astronaut" src="/images/home/astronaut.png" alt="astronaut" />
        </div>

        <div className="frame">
          <img className="img-mask" src="/images/home/Mask.png" alt="mask" />
        </div>
      </div>
    </section>
  )
})

export default HomeMain
HomeMain.displayName = 'HomeMain'

// Types
export interface IProps {
  children?: React.ReactElement
}
