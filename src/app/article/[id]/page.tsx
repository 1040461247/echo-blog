import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  params: { id: string }
}

const ArticlePage: FC<IProps> = memo((props) => {
  const articleId = props.params.id

  return <div className="article-page">article {articleId}</div>
})

export default ArticlePage
ArticlePage.displayName = 'ArticlePage'
