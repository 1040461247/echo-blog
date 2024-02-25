import ArticleCategory from '@/components/article-category'
import ArticleTags from '@/components/article-tags'
import { ARTICLE_PATH } from '@/constants'
import { IArticle } from '@/service/modules/home.request'
import formatDate from '@/utils/format-date'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  articleData: IArticle
}

const ContentMainArticleItem: FC<IProps> = memo(({ articleData }) => {
  return (
    <div className="article c-card mb-[38px]" key={articleData.id}>
      {/* Article Album */}
      {articleData.coverUrl && (
        <Link
          className="article-album group block relative overflow-hidden h-[150px]"
          href={`${ARTICLE_PATH}/${articleData.id}`}
        >
          <Image
            className="object-cover"
            src={articleData.coverUrl}
            fill
            sizes="100%"
            alt="article-album"
          />
          <div className="mask absolute inset-0 group-hover:bg-black/10 transition-colors"></div>
        </Link>
      )}

      {/* Article Main */}
      <main className="flex flex-col gap-5 justify-between px-7 pt-5 pb-7">
        <header className="article-title text-left">
          <Link className="hover-highlight" href={`${ARTICLE_PATH}/${articleData.id}`}>
            <h3 className="text-2xl">{articleData.title}</h3>
          </Link>
        </header>

        <div className="article-content text-left">
          <span className="ellipsis-4-line md:ellipsis-2-line">{articleData.description}</span>
        </div>

        <footer className="article-info flex text-sm text-gray-200/70">
          <div className="footer-left flex flex-wrap gap-3 text-left">
            <span className="article-info-date">
              <i className="iconfont icon-time mr-1" />
              <span>{formatDate(articleData.createTime)}</span>
            </span>
            <ArticleCategory mobileHide categoryInfo={articleData.category} />
            <ArticleTags mobileHide tagList={articleData.tags} />
          </div>

          <div className="article-read-more flex-1 text-right whitespace-nowrap">
            <Link className="hover-highlight" href={`${ARTICLE_PATH}/${articleData.id}`}>
              Read more &gt;
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
})

export default ContentMainArticleItem
ContentMainArticleItem.displayName = 'ContentMainArticleItem'
