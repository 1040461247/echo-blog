import type { FC } from 'react'
import { memo } from 'react'
import HomeContent from './(c-cpns)/home-content'
import HomeMain from './(c-cpns)/home-main'

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
