import Image from 'next/image'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  coverUrl: string
  title: string
}

const ArticleHeaderCover: FC<IProps> = memo(({ coverUrl, title }) => {
  return (
    <header className="h-80 relative -mx-2 sm:-mx-6 md:-mx-8">
      <div className="article-cover absolute inset-x-0 h-full">
        <Image
          className="object-cover"
          src={coverUrl}
          fill
          sizes="100vw"
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
  )
})

export default ArticleHeaderCover
ArticleHeaderCover.displayName = 'ArticleHeaderCover'
