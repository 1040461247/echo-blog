import { memo, type FC, Suspense } from 'react'
import HomeContent from './c-cpns/home-content'
import HomeMain from './c-cpns/home-main'
import BackTop from '@/components/backtop'
import ComponentLoading from '@/components/component-loading'

// Types
export interface IProps {}

const HomePage: FC<IProps> = memo(async () => {
  return (
    <div className="home-page">
      <HomeMain />

      <Suspense fallback={<ComponentLoading />}>
        <HomeContent />
      </Suspense>

      <BackTop />
    </div>
  )
})

export default HomePage
HomePage.displayName = 'HomePage'
