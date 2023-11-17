import { memo } from 'react'
import Image from 'next/image'
import articlesData from './articles-data.json'
import type { FC } from 'react'
import Link from 'next/link'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentMain: FC<IProps> = memo(() => {
  return (
    <div className="content-main flex-1">
      {articlesData.map((item) => (
        <div className="article c-card mb-[38px]" key={item.id}>
          {/* Article Album */}
          {item.album && (
            <Link
              className="article-album group block relative overflow-hidden h-[150px]"
              href={`/articles/${item.id}`}
            >
              <Image
                className="object-cover"
                src={item.album}
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
              <Link className="hover-highlight" href={`/article/${item.id}`}>
                <h3 className="text-2xl">{item.title}</h3>
              </Link>
            </header>

            <div className="article-content text-left">
              <span className="ellipsis-4-line md:ellipsis-2-line">{item.content}</span>
            </div>

            <footer className="article-info flex text-sm text-gray-200/70">
              <div className="footer-left flex flex-wrap gap-3 text-left">
                <span className="article-info-date">
                  <i className="iconfont icon-archives mr-1" />
                  <span>{item.createAt}</span>
                </span>

                <span className="article-info-category hidden sm:inline-block">
                  <i className="iconfont icon-category mr-1" />
                  <Link className="hover-highlight" href={`/category/${item.category.cateName}`}>
                    {item.category.cateName}
                  </Link>
                </span>

                <span className="article-info-tags hidden md:inline-block">
                  <i className="iconfont icon-tags mr-1" />
                  <nav className="inline-block">
                    {item.tags.map((tag, index) => (
                      <span key={tag}>
                        <Link className="hover-highlight" href={`/tags/${tag}`}>
                          {tag}
                        </Link>
                        {index !== item.tags.length - 1 && ' | '}
                      </span>
                    ))}
                  </nav>
                </span>
              </div>

              <div className="article-read-more flex-1 text-right whitespace-nowrap">
                <Link className="hover-highlight" href={`/articles/${item.id}`}>
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
