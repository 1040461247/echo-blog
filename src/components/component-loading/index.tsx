import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ComponentLoading: FC<IProps> = memo(() => {
  return (
    <div className="component-loading flex justify-center items-center h-52 bg-black/10 text-[--primary-color]">
      <i className="iconfont icon-loading text-3xl animate-spin" />
    </div>
  )
})

export default ComponentLoading
ComponentLoading.displayName = 'ComponentLoading'
