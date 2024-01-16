'use client'

import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import Link from 'next/link'
import { LOGIN_PATH } from '@/constants'

// Types
export interface IProps {
  children?: React.ReactElement
}

const CommentPanel: FC<IProps> = memo(() => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [comment, setComment] = useState('')
  const [selectionPos, setSelectionPos] = useState(0)
  const textareaRes = useRef<HTMLTextAreaElement>(null)

  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
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
    <div className="comment-panel m-2 p-2 bg-[--bg-dark-blue-deep] rounded-xl border border-gray-600 hover:border-gray-500 transition-color duration-300">
      {userInfo ? (
        <>
          <textarea
            className="w-full h-[122px] p-3 bg-transparent focus:bg-white/5 rounded-xl outline-none transition-colors duration-300"
            placeholder="说点什么吧~"
            onChange={(e) => handleChange(e)}
            value={comment}
            ref={textareaRes}
          />
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
              <button className="py-1 px-3 rounded-lg border border-gray-600 text-white hover-highlight">
                发表
              </button>
            </div>
          </footer>
          )
        </>
      ) : (
        <div className="relative">
          <textarea
            className="w-full h-20 p-3 bg-transparent rounded-xl outline-none transition-colors duration-300"
            placeholder="说点什么吧~"
            disabled
          />
          <Link
            href={LOGIN_PATH}
            className="absolute inset-x-0 top-10 w-40 h-10 m-auto py-1 px-3 rounded-lg bg-[--primary-color] text-white hover:bg-[--primary-color-dark] text-center leading-8 transition-colors"
          >
            登录/注册
          </Link>
        </div>
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
})

export default CommentPanel
CommentPanel.displayName = 'CommentPanel'
