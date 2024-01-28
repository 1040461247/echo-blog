import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NoContent: FC<IProps> = memo(() => {
  return (
    <div className="flex justify-center items-center text-gray-600 text-xs">
      <span>——</span>
      <span className="mx-2">下面没有内容了，千万不要往下看</span>
      <span>——</span>
    </div>
  )
})

export default NoContent
NoContent.displayName = 'NoContent'
