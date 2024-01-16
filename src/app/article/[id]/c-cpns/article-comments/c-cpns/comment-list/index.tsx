'use client'

import { useAppSelector } from '@/hooks/use-store'
import { memo } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import CommentItem from './c-cpns/comment-item'

// Types
export interface IProps {
  children?: React.ReactElement
}

const CommentList: FC<IProps> = memo(() => {
  const { articleComments } = useAppSelector(
    (state) => ({
      articleComments: state.article.articleComments
    }),
    shallowEqual
  )

  return (
    <div className="comment-list">
      <header className="comment-list-header my-6">
        <h2 className="text-3xl mb-3">评论</h2>
      </header>

      <div className="comment-list-content">
        {articleComments
          .filter((item) => item.comment_id === null)
          .map((comment) => (
            // 文章顶层评论
            <CommentItem comment={comment} key={comment.id}>
              {articleComments.findIndex((item) => item.comment_id === comment.id) !== -1 && (
                <div className="article-comment-reply border-l border-dashed border-gray-400">
                  {articleComments
                    .filter((item) => item.comment_id === comment.id)
                    .map((reply) => (
                      // 子评论-回复
                      <CommentItem comment={reply} replyName={comment.user.name} key={reply.id} />
                    ))}
                </div>
              )}
            </CommentItem>
          ))}
      </div>
    </div>
  )
})

export default CommentList
CommentList.displayName = 'CommentList'
