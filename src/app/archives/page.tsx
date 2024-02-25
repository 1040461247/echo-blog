'use client'

import BgTowerV2 from '@/components/bg-tower-v2'
import LoadMore from '@/components/load-more'
import Timeline from '@/components/timeline'
import useScroll from '@/hooks/use-scroll'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import {
  addArticleListPageAction,
  fetchArticlesAction,
  fetchStatisticsAction,
} from '@/store/slices/home.slice'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {}

const ArchivesPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  const { reachBottom } = useScroll()

  const { statistics, articleList } = useAppSelector(
    (state) => ({
      statistics: state.home.statistics,
      articleList: state.home.articleList,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(fetchStatisticsAction())
    dispatch(fetchArticlesAction())
  }, [])

  useEffect(() => {
    if (reachBottom && statistics?.articlesCount !== articleList.length) {
      dispatch(addArticleListPageAction())
      dispatch(fetchArticlesAction())
    }
  }, [reachBottom])

  return (
    <div className="archives-page relative bg-[--bg-dark-blue]">
      <div className="archives-content inner-layout flex-col justify-start items-center pt-5 content-card border-y-0 rounded-none">
        <BgTowerV2 />
        <header className="pt-7 text-gray-200 text-center">
          <h2 className="text-5xl mb-3">时间轴</h2>
          <h3>-共发布了{statistics?.articlesCount}篇文章-</h3>
        </header>
        <main className="w-full">
          <Timeline articlesData={articleList} />
          {statistics?.articlesCount !== articleList.length && <LoadMore />}
        </main>
      </div>
    </div>
  )
})

export default ArchivesPage
ArchivesPage.displayName = 'ArchivesPage'
