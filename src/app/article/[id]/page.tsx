'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchArticleByIdAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import BgTower from '@/components/bg-tower-v1'
import ArticleAside from './c-cpns/article-aside'
import ArticleMainHeader from './c-cpns/article-main-header'
import type { IProps as IArticleMainHeaderProps } from './c-cpns/article-main-header'
import ArticleMainInfo from './c-cpns/article-main-info'
import type { IProps as IArticleMainInfoProps } from './c-cpns/article-main-info'

// Types
export interface IProps {
  children?: React.ReactElement
  params: { id: string }
}

const ArticlePage: FC<IProps> = memo((props) => {
  const articleId = Number(props.params.id)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticleByIdAction(articleId))
  }, [])

  const { article } = useAppSelector(
    (state) => ({
      article: state.article.article
    }),
    shallowEqual
  )
  const {
    cover_url: coverUrl,
    title,
    author,
    create_time: createTime,
    update_time: updateTime,
    tags,
    category
  } = article

  // Sub Components Props
  const articleMainHeaderProps: IArticleMainHeaderProps = { coverUrl, title }
  const articleMainInfoProps: IArticleMainInfoProps = {
    createTime,
    updateTime,
    author,
    tags,
    category
  }

  return (
    <div className="article-page relative z-0 py-[38px] bg-[--bg-dark-blue] h-[1000vh]">
      <BgTower className="mt-[100vh]" />

      <div className="inner-layout items-start text-gray-300">
        <main className="article-main overflow-hidden flex-1 px-2 sm:px-6 md:px-8 md:mr-10 rounded-[18px] border border-gray-500/40 transition-all duration-300 [box-shadow:0_0_5px_rgb(255_255_255/0.1)]">
          <ArticleMainHeader {...articleMainHeaderProps} />
          <ArticleMainInfo {...articleMainInfoProps} />
        </main>

        <ArticleAside />
      </div>
    </div>
  )
})

export default ArticlePage
ArticlePage.displayName = 'ArticlePage'
