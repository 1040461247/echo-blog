import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  handleCloseIconClick: () => void
}

const CommentPanelClose: FC<IProps> = memo(({ handleCloseIconClick }) => {
  return (
    <div
      className="comment-panel-close absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer text-gray-400"
      onClick={handleCloseIconClick}
    >
      <i className="iconfont icon-error !text-xl" />
    </div>
  )
})

export default CommentPanelClose
CommentPanelClose.displayName = 'CommentPanelClose'
