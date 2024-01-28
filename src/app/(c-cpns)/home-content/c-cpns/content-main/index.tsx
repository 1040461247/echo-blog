'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { addArticleListPageAction, fetchArticlesAction } from '@/store/slices'
import type { FC } from 'react'
import { memo, useEffect, useRef } from 'react'
import { shallowEqual } from 'react-redux'
import ContentMainArticleItem from '../content-main-article-item'
import useReachBottom from '@/hooks/use-reach-bottom'
import NoContent from '@/components/no-content'

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
      {statistics.articlesCount === articleList.length && <NoContent />}
    </div>
  )
})

export default ContentMain
ContentMain.displayName = 'ContentMain'
