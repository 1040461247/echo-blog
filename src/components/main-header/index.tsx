'use client'

import { memo, useEffect } from 'react'
import '@/assets/iconfont/main-header/iconfont.css'
import HeaderLogo from './c-cpns/header-logo'
import HeaderMenuV1 from './c-cpns/header-menu-v1'
import HeaderMenuV2 from './c-cpns/header-menu-v2'

import type { FC } from 'react'
import { fetchVerifyAuthAction } from '@/store/slices'
import { useAppDispatch } from '@/hooks'

const MainHeader: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchVerifyAuthAction())
  }, [])

  return (
    <header className="main-header fixed top-0 left-0 right-0 z-50 h-[--header-height-ssm] sm:h-[--header-height-sm] md:h-[--header-height-md] bg-[#2a2a39] shadow-md ">
      <div className="inner inner-layout">
        <HeaderLogo />
        <HeaderMenuV1 />
        <HeaderMenuV2 />
      </div>
    </header>
  )
})

export default MainHeader
MainHeader.displayName = 'MainHeader'

// Types
export interface IProps {
  children?: React.ReactElement
}
