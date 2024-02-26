import Avatar from 'boring-avatars'
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

const UserAvatarNormal: FC<IProps> = memo(({ userId, size, square = false }) => {
  return (
    <Avatar
      size={size}
      name={String(userId)}
      variant="beam"
      colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
      square={square}
    />
  )
})

export default UserAvatarNormal
UserAvatarNormal.displayName = 'UserAvatarNormal'
