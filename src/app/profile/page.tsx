import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ProfilePage: FC<IProps> = memo(() => {
  return (
    <div className="profile-page sm:pt-[38px]">
      <div className="inner-layout flex-col justify-start content-card p-8 text-gray-300">
        <header>
          <h2 className="text-3xl">个人中心</h2>
        </header>
      </div>
    </div>
  )
})

export default ProfilePage
ProfilePage.displayName = 'ProfilePage'
