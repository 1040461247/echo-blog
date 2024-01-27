import { IMessageListItem } from '@/service/modules/message-record.request'
import { memo } from 'react'
import type { FC } from 'react'
import MessageItemHeader from '../message-item-header'

// Types
export interface IProps {
  children?: React.ReactElement
  messageData: IMessageListItem
}

const MessageItem: FC<IProps> = memo(({ messageData }) => {
  return (
    <div className="message-item">
      <MessageItemHeader url={messageData.sendUser.avatarUrl} userId={messageData.sendUser.id} />
    </div>
  )
})

export default MessageItem
MessageItem.displayName = 'MessageItem'
