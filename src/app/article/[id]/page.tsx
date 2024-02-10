'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchArticleByIdAction, fetchCommentsByArticleIdAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import BgTower from '@/components/bg-tower-v1'
import ArticleAside from './c-cpns/article-aside'
import ArticleHeader from './c-cpns/article-header'
import ArticleInfo from './c-cpns/article-info'
import ArticleContent from './c-cpns/article-content'
import ArticleComments from './c-cpns/article-comments'
import type { FC } from 'react'
import type { IProps as IArticleHeaderProps } from './c-cpns/article-header'
import type { IProps as IArticleInfoProps } from './c-cpns/article-info'
import type { IProps as IArticleContentProps } from './c-cpns/article-content'
import type { IProps as IArticleCopyrightProps } from './c-cpns/article-copyright'
import DividerLine from './c-cpns/divider-line'
import ArticleCopyright from './c-cpns/article-copyright'

// Types
export interface IProps {
  params: { id: string }
}
export interface IHeadOffset {
  title: string | null
  offsetTop: number
}

const ArticlePage: FC<IProps> = memo(({ params: { id } }) => {
  const articleId = Number(id)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticleByIdAction(articleId))
    dispatch(fetchCommentsByArticleIdAction(articleId))
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
    content,
    description
  } = article

  // Sub Components Props
  const articleHeaderProps: IArticleHeaderProps = { coverUrl, title }
  const articleInfoProps: IArticleInfoProps = {
    createTime,
    updateTime,
    author,
    tags,
    category
  }
  const articleContentProps: IArticleContentProps = {
    articleContent: content!,
    articleDescription: description
  }
  const articleCopyrightProps: IArticleCopyrightProps = {
    title,
    author: author?.name,
    createTime,
    updateTime
  }

  const mainCommonStyle = 'px-2 sm:px-6 md:px-8'

  return (
    <div className="article-page relative z-0 py-[18px] sm:py-[30px] md:py-[38px] bg-[--bg-dark-blue] w-full">
      <BgTower className="mt-[100vh]" />

      <div className="inner-layout items-start text-gray-300">
        <main className="article-main overflow-hidden flex-1 pb-5 md:mr-10 content-card">
          <ArticleHeader {...articleHeaderProps} customStyle={mainCommonStyle} />
          <ArticleInfo {...articleInfoProps} customStyle={mainCommonStyle} />
          <ArticleContent {...articleContentProps} customStyle={mainCommonStyle} />
          <DividerLine />
          <ArticleCopyright {...articleCopyrightProps} customStyle={mainCommonStyle} />
          <ArticleComments customStyle={mainCommonStyle} />
        </main>

        <ArticleAside articleContent={content!} />
      </div>
    </div>
  )
})

export default ArticlePage
ArticlePage.displayName = 'ArticlePage'
