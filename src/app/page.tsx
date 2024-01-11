'use client'

import { useAppDispatch } from '@/hooks/use-store'
import { fetchArticlesAction, fetchStatisticsAction } from '@/store/slices/home.slice'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import HomeContent from './(c-cpns)/home-content'
import HomeMain from './(c-cpns)/home-main'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HomePage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStatisticsAction())
    dispatch(fetchArticlesAction())
  }, [])

  return (
    <div className="home-page">
      <HomeMain />
      <HomeContent />
    </div>
  )
})

export default HomePage
HomePage.displayName = 'HomePage'
