import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NoMessage: FC<IProps> = memo(() => {
  return <div className="no-message text-center py-5 text-gray-500">暂无消息，晚点再来看看吧~</div>
})

export default NoMessage
NoMessage.displayName = 'NoMessage'
