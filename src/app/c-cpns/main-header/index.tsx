'use client'

import { memo, useEffect, useState } from 'react'
import HeaderLogo from './c-cpns/header-logo'
import HeaderMenuV1 from './c-cpns/header-menu-v1'
import HeaderMenuV2 from './c-cpns/header-menu-v2'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchMessageTotalAction, fetchVerifyAuthAction } from '@/store/slices'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import useScroll from '@/hooks/use-scroll'

const MainHeader: FC<IProps> = memo(() => {
  const [reachedTop, setReachedTop] = useState(true)

  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(fetchVerifyAuthAction())
  }, [])

  // 页面是否滚动到顶部
  const { scrollY } = useScroll()
  useEffect(() => {
    if (scrollY <= 10) {
      reachedTop || setReachedTop(true)
    } else {
      reachedTop && setReachedTop(false)
    }
  }, [scrollY])

  // 用户登录时请求消息队列
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (userInfo) {
      dispatch(fetchMessageTotalAction(userInfo.id))
      timer = setInterval(() => dispatch(fetchMessageTotalAction(userInfo!.id)), 60 * 1000) // polling
    }

    return () => clearInterval(timer)
  }, [userInfo])

  return (
    <div
      className={`main-header-wrap transition-all duration-200 ${
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
