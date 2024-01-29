import Avatar from 'boring-avatars'
import Image from 'next/image'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  avatarUrl?: string
  userId?: number
  size: number
  square?: boolean
}

const UserAvatar: FC<IProps> = memo(({ avatarUrl, userId, size, square = false }) => {
  return avatarUrl ? (
    <div
      className={`relative ${square ? 'rounded-none' : 'overflow-hidden rounded-full'}`}
      style={{ width: size, height: size }}
    >
      <Image
        className="object-cover"
        src={avatarUrl}
        fill
        sizes={size * 2 + 'px'}
        alt="user-avatar"
      />
    </div>
  ) : (
    <Avatar
      size={size}
      name={String(userId)}
      variant="beam"
      colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
      square={square}
    />
  )
})

export default UserAvatar
UserAvatar.displayName = 'UserAvatar'
