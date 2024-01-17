import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  iconName: string
  info: string
}

const CommentItemSystemTag: FC<IProps> = memo(({ iconName, info }) => {
  return (
    <span className="bg-white/5 py-[2px] px-1 ellipsis-1-line">
      <i className={`iconfont ${iconName} mr-[2px] text-[10px]`} />
      <span>{info}</span>
    </span>
  )
})

export default CommentItemSystemTag
CommentItemSystemTag.displayName = 'CommentItemSystemTag'
