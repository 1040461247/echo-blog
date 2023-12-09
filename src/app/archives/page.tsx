import { memo } from 'react'
import BgTowerV2 from '@/components/bg-tower-v2'
import Timeline from '@/components/timeline'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArchivesPage: FC<IProps> = memo(() => {
  return (
    <div className="archives-page relative h-[300vh]">
      <BgTowerV2 />
      <div className="inner-layout flex-col justify-start items-center">
        <header>
          <h2>hello world</h2>
        </header>
        <main>
          <Timeline />
        </main>
      </div>
    </div>
  )
})

export default ArchivesPage
ArchivesPage.displayName = 'ArchivesPage'
