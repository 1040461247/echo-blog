'use client'

import { memo, useEffect, useState } from 'react'
import HeaderLogo from './c-cpns/header-logo'
import HeaderMenuV1 from './c-cpns/header-menu-v1'
import HeaderMenuV2 from './c-cpns/header-menu-v2'
import { useAppDispatch } from '@/hooks/use-store'
import { fetchVerifyAuthAction } from '@/store/slices'
import type { FC } from 'react'

const MainHeader: FC<IProps> = memo(() => {
  const [reachedTop, setReachedTop] = useState(true)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchVerifyAuthAction())

    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      scrollTop === 0 ? setReachedTop(true) : setReachedTop(false)
    }
    addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`main-header-wrap bg-[--bg-dark-blue] ${
        reachedTop ? 'pt-[54px] sm:pt-[61px] md:pt-[70px]' : 'pt-[38px] sm:pt-[43px] md:pt-[48px]'
      }`}
    >
      <header
        className={`main-header fixed top-0 left-0 right-0 z-50 bg-[#2a2a39] shadow-md transition-all duration-200 ${
          reachedTop ? 'h-[54px] sm:h-[61px] md:h-[70px]' : 'h-[38px] sm:h-[43px] md:h-[48px]'
        }`}
      >
        <div className="inner inner-layout">
          <HeaderLogo />
          <HeaderMenuV1 />
          <HeaderMenuV2 />
        </div>
      </header>
    </div>
  )
})

export default MainHeader
MainHeader.displayName = 'MainHeader'

// Types
export interface IProps {
  children?: React.ReactElement
}
