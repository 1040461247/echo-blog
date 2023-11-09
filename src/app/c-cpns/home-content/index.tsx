'use client'

import { memo } from 'react'
import Image from 'next/image'
import BgTower from '@/components/bg-tower'
import './index.scss'
// Import Types
import type { FC } from 'react'

const HomeContent: FC<IProps> = memo(() => {
  return (
    <section className="home-content">
      <BgTower />

      <div className="inner">
        <aside className="sidebar">
          <div className="first-card card">
            <div className="avatar">
              <div className="avatar-wrap">
                {/* <Image src="/images/temp/avatar.png" fill alt="avatar" /> */}
                <img src="/images/temp/avatar.png" alt="avatar" />
              </div>
            </div>
            <div className="myname">
              <span>Cheems</span>
            </div>
          </div>
        </aside>
        <div className="main card"></div>
      </div>
    </section>
  )
})

export default HomeContent
HomeContent.displayName = 'HomeContent'

// Types
export interface IProps {
  children?: React.ReactElement
}
