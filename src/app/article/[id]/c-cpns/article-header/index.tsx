import { memo } from 'react'
import Image from 'next/image'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  coverUrl: string
  title: string
}

const ArticleHeader: FC<IProps> = memo(({ coverUrl, title }) => {
  return (
    <div className="article-header">
      {coverUrl ? (
        <header className="h-80 relative -mx-2 sm:-mx-6 md:-mx-8">
          <div className="article-cover absolute inset-x-0 h-full">
            <Image
              className="object-cover"
              src={coverUrl}
              fill
              sizes="100%"
              alt="article-cover"
              priority
            />
          </div>
          <div className="article-title absolute inset-x-0 bottom-0 flex w-full px-5 pb-5">
            <h2 className="px-10 py-3 max-w-full border border-gray-100/10 bg-black/20 backdrop-blur rounded-xl text-4xl text-center">
              {title}
            </h2>
          </div>
        </header>
      ) : (
        <header className="pt-6">
          <h2 className="text-4xl">{title}</h2>
        </header>
      )}
    </div>
  )
})

export default ArticleHeader
ArticleHeader.displayName = 'ArticleHeader'
