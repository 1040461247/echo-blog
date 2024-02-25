import { memo } from 'react'
import type { FC } from 'react'
import dynamic from 'next/dynamic'
import ComponentLoading from '@/components/component-loading'

// Dynamic Import
const ArticleHeaderCover = dynamic(() => import('../article-header-cover'), {
  loading: () => <ComponentLoading />,
})
const ArticleHeaderNocover = dynamic(() => import('../article-header-nocover'), {
  loading: () => <ComponentLoading />,
})

// Types
export interface IProps {
  children?: React.ReactElement
  coverUrl: string
  title: string
  customStyle?: string
}

const ArticleHeader: FC<IProps> = memo(({ coverUrl, title, customStyle }) => {
  return (
    <div className={`article-header ${customStyle}`}>
      {coverUrl ? (
        <ArticleHeaderCover coverUrl={coverUrl} title={title} />
      ) : (
        <ArticleHeaderNocover title={title} />
      )}
    </div>
  )
})

export default ArticleHeader
ArticleHeader.displayName = 'ArticleHeader'
