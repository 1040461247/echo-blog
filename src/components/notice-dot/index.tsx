import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  animate?: boolean
  word?: string | number
}

const NoticeDot: FC<IProps> = memo(({ animate = false, word }) => {
  return (
    <span className="notice-dot absolute right-0 top-0 flex">
      {animate && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--primary-color] fn opacity-50"></span>
      )}
      <span
        className={`relative inline-flex justify-center items-center rounded-full bg-[--primary-color] ${
          word ? 'px-1 text-xs text-white' : 'h-3 w-3'
        }`}
      >
        {word}
      </span>
    </span>
  )
})

export default NoticeDot
NoticeDot.displayName = 'NoticeDot'
