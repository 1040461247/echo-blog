'use client'

import { LOGIN_PATH } from '@/constants'
import { useAppSelector } from '@/hooks/use-store'
import { redirect } from 'next/navigation'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'

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

  useEffect(() => {
    if (!userInfo) redirect(LOGIN_PATH)
  }, [userInfo])

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
