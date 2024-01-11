import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const RootDefault: FC<IProps> = memo(() => {
  return <div className="fixed inset-0 bg-[--bg-dark-blue]"></div>
})

export default RootDefault
RootDefault.displayName = 'RootDefault'
