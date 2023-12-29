import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArticleComments: FC<IProps> = memo(() => {
  return (
    <div className="article-comments">
      <div className="article-comments-title text-3xl mb-3">评论</div>
      <div className="article-comments-demo">评论</div>
    </div>
  )
})

export default ArticleComments
ArticleComments.displayName = 'ArticleComments'
