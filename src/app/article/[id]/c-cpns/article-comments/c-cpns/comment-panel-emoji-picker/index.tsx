import EmojiPicker from '@emoji-mart/react'
import { memo } from 'react'
import data from '@emoji-mart/data'

import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  setShowEmojiPicker: (val: boolean) => void
  handleEmojiSelect: (val: any) => void
}

const CommentPanelEmojiPicker: FC<IProps> = memo(({ setShowEmojiPicker, handleEmojiSelect }) => {
  return (
    <div className="comment-panel-emoji-picker" onBlur={() => setShowEmojiPicker(false)}>
      <EmojiPicker
        data={data}
        onEmojiSelect={handleEmojiSelect}
        locale="zh"
        icons="solid"
        previewPosition="none"
        skinTonePosition="search"
        theme="dark"
        perLine={8}
        autoFocus
      />
    </div>
  )
})

export default CommentPanelEmojiPicker
CommentPanelEmojiPicker.displayName = 'CommentPanelEmojiPicker'
