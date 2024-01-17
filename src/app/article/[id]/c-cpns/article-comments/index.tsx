import { memo } from 'react'
import type { FC } from 'react'
import CommentPanel from './c-cpns/comment-panel'
import CommentList from './c-cpns/comment-list'

// Types
export interface IProps {
  children?: React.ReactElement
  customStyle?: string
}

const ArticleComments: FC<IProps> = memo(({ customStyle }) => {
  return (
    <div className={`article-comments ${customStyle}`}>
      <CommentPanel />
      <CommentList />
    </div>
  )
})

export default ArticleComments
ArticleComments.displayName = 'ArticleComments'
