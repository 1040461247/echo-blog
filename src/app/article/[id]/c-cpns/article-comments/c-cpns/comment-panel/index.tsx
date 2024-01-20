'use client'

import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import Link from 'next/link'
import { LOGIN_PATH } from '@/constants'
import { addCommentToArticle, addReplyToComment } from '@/service/modules/article.request'
import Message from '@/components/message'
import { fetchCommentsByArticleIdAction } from '@/store/slices'

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
    showPanel && (
      <div className="comment-panel relative m-2 p-2 bg-[--bg-dark-blue-deep] rounded-xl border border-gray-600/40 hover:border-gray-600 transition-color duration-300">
        {/* CloseIcon */}
        {handleClose && (
          <div
            className="close absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer text-gray-400"
            onClick={handleCloseIconClick}
          >
            <i className="iconfont icon-error !text-xl" />
          </div>
        )}

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
          <footer className="flex justify-between items-center px-2 mt-2">
            <div className="comment-footer-left">
              <i
                className="iconfont icon-smile cursor-pointer px-1 mr-1 hover-highlight text-xl"
                onClick={() => setShowEmojiPicker(true)}
                title="选择表情"
              />
              <i
                className="iconfont icon-clean cursor-pointer px-1 hover-highlight text-xl"
                onClick={() => setComment('')}
                title="清空评论"
              />
            </div>
            <div className="comment-footer-right">
              <button
                className="py-1 px-3 rounded-lg border border-gray-600 text-white hover-highlight"
                onClick={handleCommit}
              >
                发表
              </button>
            </div>
          </footer>
        ) : (
          <Link
            href={LOGIN_PATH}
            className="absolute inset-x-0 top-10 w-40 h-10 m-auto py-1 px-3 rounded-lg bg-[--primary-color] text-white hover:bg-[--primary-color-dark] text-center leading-8 transition-colors duration-200"
          >
            登录/注册
          </Link>
        )}

        {showEmojiPicker && (
          <div className="picker absolute" onBlur={() => setShowEmojiPicker(false)}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              locale="zh"
              icons="solid"
              previewPosition="none"
              skinTonePosition="search"
              theme="dark"
              perLine={7}
              autoFocus
            />
          </div>
        )}
      </div>
    )
  )
})

export default CommentPanel
CommentPanel.displayName = 'CommentPanel'
