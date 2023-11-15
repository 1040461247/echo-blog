import { memo } from 'react'
import HomeMain from './c-cpns/home-main'
import HomeContent from './c-cpns/home-content'
// Types import
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const IndexPage: FC<IProps> = memo(() => {
  return (
    <div className="index-page">
      <HomeMain />
      <HomeContent />
    </div>
  )
})

export default IndexPage
IndexPage.displayName = 'IndexPage'
