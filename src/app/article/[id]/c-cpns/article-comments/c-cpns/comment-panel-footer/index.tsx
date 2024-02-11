import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  setShowEmojiPicker: (val: boolean) => void
  setComment: (val: string) => void
  handleCommit: () => void
}

const CommentPanelFooter: FC<IProps> = memo(({ setShowEmojiPicker, setComment, handleCommit }) => {
  return (
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
  )
})

export default CommentPanelFooter
CommentPanelFooter.displayName = 'CommentPanelFooter'
