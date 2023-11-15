'use client'

import { memo } from 'react'
import Link from 'next/link'
import BgTower from '@/components/bg-tower'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeContent: FC<IProps> = memo(() => {
  return (
    <section className="relative z-10 top-[-2px] text-center">
      <BgTower />

      <article className="flex h-full w-4/5 max-w-[1200px] mx-auto">
        {/* Left Aside*/}
        <aside className="hidden sm:block sticky top-[--header-height-ssm] sm:top-[--header-height-sm] md:top-[--header-height-md] w-60 mr-6">
          <div className=" c-card">
            {/* Profile Area */}
            <div className="brief">
              <div className="pt-5">
                <div className="overflow-hidden w-20 h-20 inline-block p-[1px] rounded-[18px] border border-solid border-gray-500 shadow-lg">
                  <img
                    className="w-[120%] overflow-hidden rounded-[18px]"
                    src="/images/temp/avatar.png"
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="text-xl">
                <span>Cheems</span>
              </div>
              <div className="text-xs opacity-70">站在巨人的肩膀上</div>
            </div>
            {/* Statistics Area */}
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

        {/* Main Article */}
        <div className="c-card flex-1 h-[2000px]">hello world</div>
      </article>
    </section>
  )
})

export default HomeContent
HomeContent.displayName = 'HomeContent'
