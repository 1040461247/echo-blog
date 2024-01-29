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
      <header className="comment-header mt-10 mb-6">
        <h2 className="text-3xl mb-3">评论</h2>
      </header>

      <CommentPanel />
      <CommentList />
    </div>
  )
})

export default ArticleComments
ArticleComments.displayName = 'ArticleComments'
