'use client'

import { useAppSelector } from '@/hooks/use-store'
import { memo, useState } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import CommentItem from './c-cpns/comment-item'
import { IComment } from '@/service/modules/article.request'

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

  const [curReplyId, setCurReplyId] = useState(-1)

  // 根据一级评论获得其下所有子评论的平行列表
  function getReplysBySupComment(supCommentId: number) {
    const replys = []
    const commentReplys = articleComments.filter((comment) => comment.comment_id === supCommentId)
    if (commentReplys.length === 0) return []

    for (const commentReply of commentReplys) {
      const subReplys: IComment[] = getReplysBySupComment(commentReply.id)
      replys.push(commentReply, ...subReplys)
    }

    return replys
  }

  return (
    <div className="comment-list">
      <header className="comment-list-header my-6">
        <h2 className="text-3xl mb-3">{articleComments.length}评论</h2>
      </header>

      <div className="comment-list-content">
        {articleComments
          .filter((item) => item.comment_id === null)
          .map((comment) => (
            // 文章顶层评论
            <CommentItem
              comment={comment}
              key={comment.id}
              setCurReplyId={setCurReplyId}
              curReplyId={curReplyId}
            >
              {articleComments.findIndex((item) => item.comment_id === comment.id) !== -1 && (
                <div className="article-comment-reply border-l border-dashed border-gray-400">
                  {getReplysBySupComment(comment.id).map((reply) => (
                    // 子评论-回复
                    <CommentItem
                      comment={reply}
                      replyName={comment.user.name}
                      key={reply.id}
                      setCurReplyId={setCurReplyId}
                      curReplyId={curReplyId}
                    />
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
