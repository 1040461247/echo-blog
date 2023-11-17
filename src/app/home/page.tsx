import { memo } from 'react'
import HomeMain from './c-cpns/home-main'
import HomeContent from './c-cpns/home-content'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomePage: FC<IProps> = memo(() => {
  return (
    <div className="home-page">
      <HomeMain />
      <HomeContent />
    </div>
  )
})

export default HomePage
HomePage.displayName = 'HomePage'
