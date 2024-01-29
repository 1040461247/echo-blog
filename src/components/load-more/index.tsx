'use client'

import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const LoadMore: FC<IProps> = memo(() => {
  const [val, setVal] = useState('火速加载中...')

  useEffect(() => {
    const timer = setTimeout(() => {
      setVal('太久没反应？刷新一下试试~')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="load-more flex justify-center items-center">
      <i className="iconfont icon-loading animate-spin mr-2 text-xl text-[--primary-color]" />
      <span className="text-gray-300">{val}</span>
    </div>
  )
})

export default LoadMore
LoadMore.displayName = 'LoadMore'
