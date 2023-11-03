import { memo } from 'react'
import './page-style.scss'
import HomeMain from './c-cpns/home-main'
// Types import
import type { FC } from 'react'

const IndexPage: FC<IProps> = memo(() => {
  return (
    <div className="index-page">
      <HomeMain />
    </div>
  )
})

export default IndexPage
IndexPage.displayName = 'IndexPage'

// Types
export interface IProps {
  children?: React.ReactElement
}
