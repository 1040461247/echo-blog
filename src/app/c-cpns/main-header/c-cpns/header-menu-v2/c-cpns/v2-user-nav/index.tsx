'use client'

import { memo } from 'react'
import type { FC } from 'react'
import V2MenuItem from '../v2-menu-item'
import { NOTIFICATION_PATH, NOTIFICATION_UNREAD_PATH, PROFILE_PATH } from '@/constants'
import { useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
  setIsDrawerOpen: (val: boolean) => void
  handleLogout: () => void
}

const V2UserNav: FC<IProps> = memo(({ setIsDrawerOpen, handleLogout }) => {
  const { total } = useAppSelector(
    (state) => ({
      total: state.messageRecord.total,
    }),
    shallowEqual,
  )

  return (
    <div className="user-nav">
      <V2MenuItem
        text="个人中心"
        isLink
        path={PROFILE_PATH}
        iconName="icon-home"
        handleClick={() => setIsDrawerOpen(false)}
      />
      <V2MenuItem
        text={total.unreadCount === 0 ? '消息' : `未读消息(${total.unreadCount})`}
        isLink
        path={total.unreadCount === 0 ? NOTIFICATION_PATH : NOTIFICATION_UNREAD_PATH}
        iconName="icon-notification"
        handleClick={() => setIsDrawerOpen(false)}
      />
      <V2MenuItem text="退出登录" isLink={false} iconName="icon-tags" handleClick={handleLogout} />
    </div>
  )
})

export default V2UserNav
V2UserNav.displayName = 'V2UserNav'
