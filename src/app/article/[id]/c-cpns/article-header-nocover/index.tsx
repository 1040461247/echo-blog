import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  title: string
}

const ArticleHeaderNocover: FC<IProps> = memo(({ title }) => {
  return (
    <header className="article-header-nocover pt-6">
      <h2 className="text-4xl">{title}</h2>
    </header>
  )
})

export default ArticleHeaderNocover
ArticleHeaderNocover.displayName = 'ArticleHeaderNocover'
