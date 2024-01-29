'use client'

import { useAppSelector } from '@/hooks/use-store'
import { memo } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import ProfileCard from './c-cpns/profile-card'
import ProfileAvatar from './c-cpns/profile-avatar'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ProfilePage: FC<IProps> = memo(() => {
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  return (
    <div className="profile-page sm:pt-[38px]">
      <div className="inner-layout flex-col items-center justify-start content-card p-8 text-gray-300">
        <div className="profile-avatar-wrap w-[125px] h-[125px] flex items-center justify-center rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[#5c5648]">
          <ProfileAvatar />
        </div>
      </div>
    </div>
  )
})

export default ProfilePage
ProfilePage.displayName = 'ProfilePage'
