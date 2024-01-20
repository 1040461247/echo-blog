import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FriendsPage: FC<IProps> = memo(() => {
  return (
    <div className="friends-page h-[200vh] pt-[38px] bg-[--bg-dark-blue] ">
      <div className="inner-layout content-card">aaa</div>
    </div>
  )
})

export default FriendsPage
FriendsPage.displayName = 'FriendsPage'
