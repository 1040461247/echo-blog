import Message from '@/components/message'
import NoticeDot from '@/components/notice-dot'
import SubmenuItem from '@/components/submenu-item'
import SubmenuWrap from '@/components/submenu-wrap'
import UserAvatar from '@/components/user-avatar'
import { NOTIFICATION_PATH, NOTIFICATION_UNREAD_PATH, PROFILE_PATH } from '@/constants'
import useLogout from '@/hooks/use-logout'
import { useAppSelector } from '@/hooks/use-store'
import type { IUserInfo } from '@/service/modules/user.request'
import type { FC } from 'react'
import { memo } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
  userInfo: IUserInfo | null
  isActivePath: (item: any) => boolean
}

const V1UserInfo: FC<IProps> = memo(({ userInfo, isActivePath }) => {
  const logout = useLogout()

  function handleLogout() {
    logout()
    Message.success('用户已退出')
  }

  const { total } = useAppSelector(
    (state) => ({
      total: state.messageRecord.total,
    }),
    shallowEqual,
  )

  return (
    <div className="v1-user-info group relative flex justify-center items-center ml-1 cursor-pointer">
      {/* Avatar */}
      <div className="user-avatar">
        <div className="flex items-center overflow-hidden rounded-full w-10 h-10">
          <UserAvatar avatarUrl={userInfo?.avatarUrl} userId={userInfo?.id} size={35} />
        </div>
        {total.unreadCount !== 0 && <NoticeDot />}
      </div>

      {/* Submenu */}
      <SubmenuWrap>
        <SubmenuItem
          isActive={isActivePath({ path: PROFILE_PATH })}
          path={PROFILE_PATH}
          iconName="icon-user"
          text="个人中心"
        />

        <SubmenuItem
          isActive={isActivePath({ path: NOTIFICATION_PATH })}
          path={total.unreadCount === 0 ? NOTIFICATION_PATH : NOTIFICATION_UNREAD_PATH}
          iconName="icon-notification"
          text={total.unreadCount === 0 ? '消息' : `未读消息(${total.unreadCount})`}
        />

        <SubmenuItem isActive={false} handleClick={handleLogout}>
          <div className="submenu-item-link inline-block w-full h-full px-[15px] py-[3px] cursor-pointer">
            <i className={`icon iconfont icon-exit mr-[2px]`} />
            <span className="text">退出登录</span>
          </div>
        </SubmenuItem>
      </SubmenuWrap>
    </div>
  )
})

export default V1UserInfo
V1UserInfo.displayName = 'V1UserInfo'
