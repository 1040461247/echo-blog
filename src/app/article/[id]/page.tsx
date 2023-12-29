'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchArticleByIdAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import BgTower from '@/components/bg-tower-v1'
import ArticleAside from './c-cpns/article-aside'
import ArticleHeader from './c-cpns/article-header'
import ArticleInfo from './c-cpns/article-info'
import ArticleContent from './c-cpns/article-content'
import ArticleComments from './c-cpns/article-comments'
import type { FC } from 'react'
import type { IProps as IArticleMainHeaderProps } from './c-cpns/article-header'
import type { IProps as IArticleMainInfoProps } from './c-cpns/article-info'

// Types
export interface IProps {
  children?: React.ReactElement
  params: { id: string }
}
export interface IHeadOffset {
  title: string | null
  offsetTop: number
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
    category,
    content
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
    <div className="article-page relative z-0 py-[18px] sm:py-[30px] md:py-[38px] bg-[--bg-dark-blue] w-full">
      <BgTower className="mt-[100vh]" />

      <div className="inner-layout items-start text-gray-300">
        <main className="article-main overflow-hidden flex-1 px-2 sm:px-6 md:px-8 md:mr-10 sm:rounded-[18px] sm:bg-black/20 backdrop-blur sm:border border-gray-500/40 transition-all duration-300 sm:[box-shadow:0_0_5px_rgb(255_255_255/0.1)]">
          <ArticleHeader {...articleMainHeaderProps} />
          <ArticleInfo {...articleMainInfoProps} />
          <ArticleContent articleContent={content} />
          <ArticleComments />
        </main>

        <ArticleAside articleContent={content} />
      </div>
    </div>
  )
})

export default ArticlePage
ArticlePage.displayName = 'ArticlePage'
