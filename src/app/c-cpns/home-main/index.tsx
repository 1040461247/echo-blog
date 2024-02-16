import type { FC } from 'react'
import { memo } from 'react'
import HomeMainText from './c-cpns/home-main-text'
import HomeMainAstronaut from './c-cpns/home-main-astronaut'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomeMain: FC<IProps> = memo(() => {
  return (
    <div className="home-main overflow-hidden relative h-[calc(100vh+45vw)] md:h-[calc(100vh+40vw)] bg-[--bg-light-blue]">
      <HomeMainText />
      <HomeMainAstronaut />
    </div>
  )
})

export default HomeMain
HomeMain.displayName = 'HomeMain'
