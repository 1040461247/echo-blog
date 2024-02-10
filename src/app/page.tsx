import type { FC } from 'react'
import { Suspense, memo } from 'react'
import HomeContent from './c-cpns/home-content'
import HomeMain from './c-cpns/home-main'
import BackTop from '@/components/backtop'
import PageLoading from '@/components/page-loading'

// Types
export interface IProps {}

const HomePage: FC<IProps> = memo(() => {
  return (
    <div className="home-page">
      <HomeMain />
      <HomeContent />
      <BackTop />
    </div>
  )
})

export default HomePage
HomePage.displayName = 'HomePage'
