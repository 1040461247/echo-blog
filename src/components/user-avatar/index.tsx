import { memo } from 'react'
import type { FC } from 'react'
import UserAvatarCustom from './c-cpns/user-avatar-custom'
import UserAvatarNormal from './c-cpns/user-avatar-normal'

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
    <UserAvatarCustom avatarUrl={avatarUrl} size={size} square={square} />
  ) : (
    <UserAvatarNormal userId={userId} size={size} square={square} />
  )
})

export default UserAvatar
UserAvatar.displayName = 'UserAvatar'
