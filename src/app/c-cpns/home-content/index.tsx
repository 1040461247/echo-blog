'use client'

import { memo } from 'react'
import Link from 'next/link'
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
            <div className="brief">
              <div className="avatar">
                <div className="avatar-wrap">
                  <img src="/images/temp/avatar.png" alt="avatar" />
                </div>
              </div>
              <div className="myname">
                <span>Cheems</span>
              </div>
              <div className="motto">站在巨人的肩膀上</div>
            </div>
            <div className="statistics">
              <Link href="/archives" className="statistics-article statistics-item">
                <span className="sa-count"></span>
                <span className="sa-text"></span>
              </Link>
              <Link href="/category" className="statistics-category statistics-item"></Link>
              <Link href="/tags" className="tag-count statistics-item"></Link>
            </div>
          </div>
        </aside>

        <div className="main card">hello world</div>
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
