'use client'

import { memo } from 'react'
import BgTower from '@/components/bg-tower'
import ContentSidebar from './c-cpns/content-sidebar'
import ContentMain from './c-cpns/content-main'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeContent: FC<IProps> = memo(() => {
  return (
    <div className="relative z-10 text-center -mt-2 pt-10 bg-[--bg-dark-blue]">
      <BgTower />

      <div className="inner-layout">
        <ContentSidebar />
        <ContentMain />
      </div>
    </div>
  )
})

export default HomeContent
HomeContent.displayName = 'HomeContent'
