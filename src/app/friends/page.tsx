import { memo } from 'react'
import type { FC } from 'react'
import FriendsHeader from './c-cpns/friends-header'
import FriendsContent from './c-cpns/friends-content'
import AuditFriends from './c-cpns/audit-friends'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FriendsPage: FC<IProps> = memo(() => {
  return (
    <div className="friends-page sm:pt-[38px] bg-[--bg-dark-blue] ">
      <div className="inner-layout flex-col justify-start content-card p-8 text-gray-300">
        <FriendsHeader />
        <FriendsContent />
        <AuditFriends />
      </div>
    </div>
  )
})

export default FriendsPage
FriendsPage.displayName = 'FriendsPage'
