'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { addArticleListPageAction, fetchArticlesAction } from '@/store/slices'
import type { FC } from 'react'
import { memo, useEffect, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import ContentMainArticleItem from '../content-main-article-item'
import useReachBottom from '@/hooks/use-reach-bottom'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentMain: FC<IProps> = memo(() => {
  const contentMainRef = useRef<HTMLDivElement>(null)
  const [reachedBottom] = useReachBottom()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticlesAction())
  }, [])

  useEffect(() => {
    if (reachedBottom) {
      dispatch(addArticleListPageAction())
      dispatch(fetchArticlesAction())
    }
  }, [reachedBottom])

  const { articleList, statistics } = useAppSelector(
    (state) => ({
      articleList: state.home.articleList,
      statistics: state.home.statistics
    }),
    shallowEqual
  )

  return (
    <div className="content-main flex-1" ref={contentMainRef}>
      <div className="article-list">
        {articleList.map((item) => (
          <ContentMainArticleItem articleData={item} key={item.id} />
        ))}
      </div>
      {statistics.articlesCount === articleList.length && (
        <div className="flex justify-center items-center text-gray-600 text-xs">
          <span>——</span>
          <span className="mx-2">下面没有内容了，千万不要往下看</span>
          <span>——</span>
        </div>
      )}
    </div>
  )
})

export default ContentMain
ContentMain.displayName = 'ContentMain'
