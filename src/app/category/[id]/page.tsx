'use client'

import { memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import { fetchArticlesByCategoryIdAction, fetchCategoryByIdAction } from '@/store/slices'
import ArticlesDisplay from '@/components/articles-display'
import type { IProps as IArticlesDisplayProps } from '@/components/articles-display'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  params: { id: string }
}

const CategoryPage: FC<IProps> = memo((props) => {
  const categoryid = Number(props.params.id)

  // Request
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticlesByCategoryIdAction(categoryid))
    dispatch(fetchCategoryByIdAction(categoryid))
  }, [])

  // Store
  const { articles, category } = useAppSelector(
    (state) => ({
      articles: state.category.articles,
      category: state.category.category
    }),
    shallowEqual
  )

  const articleDisplayProps: IArticlesDisplayProps = {
    titleIcon: (className) => <i className={`iconfont icon-category ${className}`} />,
    titleText: category.name,
    articlesData: articles
  }

  return (
    <div className="category-page">
      <ArticlesDisplay {...articleDisplayProps} />
    </div>
  )
})

export default CategoryPage
CategoryPage.displayName = 'CategoryPage'
