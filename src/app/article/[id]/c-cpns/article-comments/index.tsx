import { memo } from 'react'
import type { FC } from 'react'
import CommentPanel from './c-cpns/comment-panel'
import CommentList from './c-cpns/comment-list'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArticleComments: FC<IProps> = memo(() => {
  return (
    <div className="article-comments">
      <CommentPanel />
      <CommentList />
    </div>
  )
})

export default ArticleComments
ArticleComments.displayName = 'ArticleComments'
