import PageLoading from '@/components/page-loading'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const Loading: FC<IProps> = memo(() => {
  return (
    <div className="loading">
      <PageLoading />
    </div>
  )
})

export default Loading
Loading.displayName = 'Loading'
