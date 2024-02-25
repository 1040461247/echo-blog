'use client'

import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import { fetchArticlesByTagIdAction, fetchTagByIdAction } from '@/store/slices'
import ArticlesDisplay from '@/components/articles-display'
import type { IProps as IArticlesDisplayProps } from '@/components/articles-display'
import type { FC } from 'react'

// Types
export interface IProps {
  params: { id: string }
}

const TagPage: FC<IProps> = memo((props) => {
  const tagId = Number(props.params.id)

  // Request
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticlesByTagIdAction(tagId))
    dispatch(fetchTagByIdAction(tagId))
  }, [])

  // Store
  const { articles, tag } = useAppSelector(
    (state) => ({
      articles: state.tag.articles,
      tag: state.tag.tag,
    }),
    shallowEqual,
  )

  const articleDisplayProps: IArticlesDisplayProps = {
    titleIcon: (className) => <i className={`iconfont icon-tags ${className}`} />,
    titleText: tag.name,
    articlesData: articles,
  }

  return (
    <div className="category-page">
      <ArticlesDisplay {...articleDisplayProps} />
    </div>
  )
})

export default TagPage
TagPage.displayName = 'CategoryPage'
