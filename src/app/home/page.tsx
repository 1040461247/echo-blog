'use client'

import { memo, useEffect } from 'react'
import { useAppDispatch } from '@/hooks/store'
import { fetchStatisticsAction, fetchArticlesAction } from '@/store/slices/home.slice'
import HomeMain from './c-cpns/home-main'
import HomeContent from './c-cpns/home-content'
import type { FC } from 'react'

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
