'use client'

import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import { fetchStatisticsAction, fetchArticlesAction } from '@/store/slices/home.slice'
import BgTowerV2 from '@/components/bg-tower-v2'
import Timeline from '@/components/timeline'
import { useAppDispatch, useAppSelector } from '@/hooks'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArchivesPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStatisticsAction())
    dispatch(fetchArticlesAction())
  }, [])

  const { statistics, articles } = useAppSelector(
    (state) => ({
      statistics: state.home.statistics,
      articles: state.home.articleList
    }),
    shallowEqual
  )

  return (
    <div className="archives-page relative">
      <BgTowerV2 />

      <div className="archives-content inner-layout flex-col justify-start items-center">
        <header className="pt-7 text-[var(--font-light-blue)] text-center">
          <h2 className="text-5xl mb-3">时间轴</h2>
          <h3 className="text-2xl">({statistics.articlesCount})</h3>
        </header>
        <main className="">
          <Timeline articlesData={articles} />
        </main>
      </div>
    </div>
  )
})

export default ArchivesPage
ArchivesPage.displayName = 'ArchivesPage'
