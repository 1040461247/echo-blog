import Image from 'next/image'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  avatarUrl: string
  userId?: number
  size: number
  square?: boolean
}

const UserAvatarCustom: FC<IProps> = memo(({ avatarUrl, size, square = false }) => {
  return (
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
  )
})

export default UserAvatarCustom
UserAvatarCustom.displayName = 'UserAvatarCustom'
