import messageTypeTemplate from '@/assets/data/message-type-template'
import { IMessageListItem } from '@/service/modules/message-record.request'
import formatDate from '@/utils/format-date'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  messageData: IMessageListItem
}

const MessageItemMain: FC<IProps> = memo(({ messageData }) => {
  return (
    <main className="message-item-main flex flex-col gap-2">
      <div className="message-title">
        <span className="send-user-name text-lg mr-3">{messageData.sendUser.name}</span>
        <span className="send-user-name text-gray-400/80">
          {messageTypeTemplate[messageData.messageType]}
        </span>
      </div>

      <div
        className={`message-content overflow-hidden text-sm ellipsis-2-line ${
          messageData.messageType === '0' ? 'pl-1 text-gray-600 border-l-2 border-gray-600' : ''
        }`}
      >
        {messageData.content}
      </div>

      <div className="message-time text-gray-600 text-sm">
        {formatDate(messageData.createTime, 'YYYY-MM-DD')}
      </div>
    </main>
  )
})

export default MessageItemMain
MessageItemMain.displayName = 'MessageItemMain'
