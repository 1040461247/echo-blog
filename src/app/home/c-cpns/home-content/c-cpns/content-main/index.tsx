import ArticleCategory from '@/components/article-category'
import ArticleTags from '@/components/article-tags'
import { ARTICLE_PATH } from '@/constants'
import { useAppSelector } from '@/hooks/use-store'
import formatDate from '@/utils/format-date'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentMain: FC<IProps> = memo(() => {
  const { articleList } = useAppSelector(
    (state) => ({
      articleList: state.home.articleList
    }),
    shallowEqual
  )

  return (
    <div className="content-main flex-1">
      {articleList.map((item) => (
        <div className="article c-card mb-[38px]" key={item.id}>
          {/* Article Album */}
          {item.cover_url && (
            <Link
              className="article-album group block relative overflow-hidden h-[150px]"
              href={`${ARTICLE_PATH}/${item.id}`}
            >
              <Image
                className="object-cover"
                src={item.cover_url}
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
              <Link className="hover-highlight" href={`${ARTICLE_PATH}/${item.id}`}>
                <h3 className="text-2xl">{item.title}</h3>
              </Link>
            </header>

            <div className="article-content text-left">
              <span className="ellipsis-4-line md:ellipsis-2-line">{item.description}</span>
            </div>

            <footer className="article-info flex text-sm text-gray-200/70">
              <div className="footer-left flex flex-wrap gap-3 text-left">
                <span className="article-info-date">
                  <i className="iconfont icon-time mr-1" />
                  <span>{formatDate(item.create_time)}</span>
                </span>
                <ArticleCategory mobileHide categoryInfo={item.category} />
                <ArticleTags mobileHide tagList={item.tags} />
              </div>

              <div className="article-read-more flex-1 text-right whitespace-nowrap">
                <Link className="hover-highlight" href={`${ARTICLE_PATH}/${item.id}`}>
                  Read more &gt;
                </Link>
              </div>
            </footer>
          </main>
        </div>
      ))}
    </div>
  )
})

export default ContentMain
ContentMain.displayName = 'ContentMain'
