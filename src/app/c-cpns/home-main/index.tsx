'use client'

import { memo } from 'react'
import './index.scss'
// const Rellax = require('rellax')
import Rellax from 'rellax'
// Types import
import type { FC } from 'react'

const HomeMain: FC<IProps> = memo(() => {
  if (typeof window !== 'undefined') new Rellax()

  return (
    <section className="home-main">
      <div className="content">hello world</div>

      <div className="bottom">
        <div className="astronaut rellax" data-rellax-speed="-7">
          <div className="astronaut-mask">
            <img
              className="img-sta rellax"
              src="/images/home/astronaut-sta.png"
              alt="universe"
              data-rellax-speed="-6"
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
