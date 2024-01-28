import Avatar from 'boring-avatars'
import Image from 'next/image'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  url?: string
  userId?: number
}

const MessageItemHeader: FC<IProps> = memo(({ url, userId }) => {
  return (
    <header className="message-item-header">
      {url ? (
        <div className="relative overflow-hidden w-[50px] h-[50px] rounded-full">
          <Image className="object-cover" fill sizes="100px" src={url} alt="send-user-avater" />
        </div>
      ) : (
        <Avatar
          size={50}
          name={String(userId)}
          variant="beam"
          colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
        />
      )}
    </header>
  )
})

export default MessageItemHeader
MessageItemHeader.displayName = 'MessageItemHeader'
