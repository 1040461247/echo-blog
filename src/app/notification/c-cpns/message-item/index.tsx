import { IMessageListItem } from '@/service/modules/message-record.request'
import { memo } from 'react'
import type { FC } from 'react'
import MessageItemHeader from '../message-item-header'
import Link from 'next/link'
import { ARTICLE_PATH } from '@/constants'
import MessageItemMain from '../message-item-main'

// Types
export interface IProps {
  children?: React.ReactElement
  messageData: IMessageListItem
}

const MessageItem: FC<IProps> = memo(({ messageData }) => {
  return (
    <Link
      className="message-item flex gap-4 px-8 py-6 border-b last:border-none border-gray-600/30 hover:bg-gray-600/5 transition-colors duration-200"
      href={`${ARTICLE_PATH}/${messageData.linkAtcId}`}
    >
      <MessageItemHeader url={messageData.sendUser.avatarUrl} userId={messageData.sendUser.id} />
      <MessageItemMain messageData={messageData} />
    </Link>
  )
})

export default MessageItem
MessageItem.displayName = 'MessageItem'
