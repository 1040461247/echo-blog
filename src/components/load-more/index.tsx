import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const LoadMore: FC<IProps> = memo(() => {
  return (
    <div className="load-more flex justify-center items-center">
      <i className="iconfont icon-loading animate-spin mr-2 text-xl text-[--primary-color]" />
      <span className="text-gray-300">火速加载中...</span>
    </div>
  )
})

export default LoadMore
LoadMore.displayName = 'LoadMore'
