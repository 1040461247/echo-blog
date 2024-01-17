import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const DividerLine: FC<IProps> = memo(() => {
  return <div className="line h-[0.5px] my-8 bg-white/10"></div>
})

export default DividerLine
DividerLine.displayName = 'DeviderLine'
