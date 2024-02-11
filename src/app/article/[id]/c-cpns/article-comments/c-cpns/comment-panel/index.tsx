'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import { addCommentToArticle, addReplyToComment } from '@/service/modules/article.request'
import Message from '@/components/message'
import { fetchCommentsByArticleIdAction } from '@/store/slices'
import dynamic from 'next/dynamic'
import ComponentLoading from '@/components/component-loading'
import type { FC } from 'react'

// Dynamic Import
const CommentPanelClose = dynamic(() => import('../comment-panel-close'), {
  loading: () => <ComponentLoading />
})
const CommentPanelFooter = dynamic(() => import('../comment-panel-footer'), {
  loading: () => <ComponentLoading />
})
const CommentPanelAuth = dynamic(() => import('../comment-panel-auth'), {
  loading: () => <ComponentLoading />
})
const CommentPanelEmojiPicker = dynamic(() => import('../comment-panel-emoji-picker'), {
  loading: () => <ComponentLoading />
})

// Types
export interface IProps {
  children?: React.ReactElement
  handleClose?: () => void
  replyCommentId?: number
}

const CommentPanel: FC<IProps> = memo(({ handleClose, replyCommentId }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [comment, setComment] = useState('')
  const [selectionPos, setSelectionPos] = useState(0)
  const textareaRes = useRef<HTMLTextAreaElement>(null)
  const [showPanel, setShowPanel] = useState(true)
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  const { article } = useAppSelector(
    (state) => ({
      article: state.article.article
    }),
    shallowEqual
  )

  // Handles
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setComment(value)
  }

  function handleEmojiSelect(e: any) {
    insertEmoji(e.native)
  }

  function handleCloseIconClick() {
    setShowPanel(false)
    handleClose && handleClose()
  }

  async function handleCommit() {
    if (!userInfo) return

    if (replyCommentId) {
      // 回复评论
      const res = await addReplyToComment(userInfo.id!, article.id, comment, replyCommentId)
      if (res.code === 200) {
        Message.success('回复成功')
        dispatch(fetchCommentsByArticleIdAction(article.id))
        setShowPanel(false)
        handleClose && handleClose()
      } else {
        Message.error(res.msg)
      }
    } else {
      // 文章评论
      const res = await addCommentToArticle(userInfo.id!, article.id, comment)
      if (res.code === 200) {
        Message.success('评论成功')
        dispatch(fetchCommentsByArticleIdAction(article.id))
        setComment('')
      } else {
        Message.error(res.msg)
      }
    }
  }

  function insertEmoji(emojiNative: string) {
    // 获取光标位置
    const cursorPosition = textareaRes.current?.selectionStart
    // 获取文本内容
    const textBeforeCursor = comment.substring(0, cursorPosition)
    const textAfterCursor = comment.substring(cursorPosition!)
    const newText = `${textBeforeCursor}${emojiNative}${textAfterCursor}`

    // 更新内容
    setComment(newText)
    setSelectionPos(cursorPosition! + emojiNative.length)
  }

  useEffect(() => {
    textareaRes.current?.setSelectionRange(selectionPos, selectionPos)
  }, [selectionPos])

  return (
    <div
      className={`${
        showPanel ? '' : 'hidden'
      } comment-panel relative m-2 p-2 bg-[--bg-dark-blue-deep] rounded-xl border border-gray-600/40 hover:border-gray-600 transition-color duration-300`}
    >
      {/* CloseIcon */}
      {handleClose && <CommentPanelClose handleCloseIconClick={handleCloseIconClick} />}

      <textarea
        className={`w-full p-3 bg-transparent rounded-xl outline-none transition-colors duration-300 ${
          userInfo ? 'h-[122px] focus:bg-white/5' : 'h-20 '
        }`}
        placeholder="说点什么吧~"
        onChange={(e) => handleChange(e)}
        value={comment}
        ref={textareaRes}
        disabled={!userInfo}
      />

      {userInfo ? (
        <CommentPanelFooter
          setShowEmojiPicker={setShowEmojiPicker}
          setComment={setComment}
          handleCommit={handleCommit}
        />
      ) : (
        <CommentPanelAuth />
      )}

      {showEmojiPicker && (
        <CommentPanelEmojiPicker
          setShowEmojiPicker={setShowEmojiPicker}
          handleEmojiSelect={handleEmojiSelect}
        />
      )}
    </div>
  )
})

export default CommentPanel
CommentPanel.displayName = 'CommentPanel'
