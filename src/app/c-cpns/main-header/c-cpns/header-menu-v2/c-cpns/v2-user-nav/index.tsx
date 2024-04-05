import { memo } from 'react'
import type { FC } from 'react'
import V2MenuItem from '../v2-menu-item'
import { NOTIFICATION_PATH, PROFILE_PATH } from '@/constants'

// Types
export interface IProps {
  children?: React.ReactElement
  setIsDrawerOpen: (val: boolean) => void
  handleLogout: () => void
}

const V2UserNav: FC<IProps> = memo(({ setIsDrawerOpen, handleLogout }) => {
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
        text="消息"
        isLink
        path={NOTIFICATION_PATH}
        iconName="icon-notification"
        handleClick={() => setIsDrawerOpen(false)}
      />
      <V2MenuItem text="退出登录" isLink={false} iconName="icon-tags" handleClick={handleLogout} />
    </div>
  )
})

export default V2UserNav
V2UserNav.displayName = 'V2UserNav'
