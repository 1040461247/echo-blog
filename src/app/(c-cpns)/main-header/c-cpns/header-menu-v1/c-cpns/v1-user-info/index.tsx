import Message from '@/components/message'
import NoticeDot from '@/components/notice-dot'
import SubmenuItem from '@/components/submenu-item'
import SubmenuWrap from '@/components/submenu-wrap'
import { NOTIFICATION_PATH, PROFILE_PATH } from '@/constants'
import useLogout from '@/hooks/use-logout'
import { useAppSelector } from '@/hooks/use-store'
import type { IUserInfo } from '@/service/modules/user.request'
import Avatar from 'boring-avatars'
import Image from 'next/image'
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

  const { unreadMessageCount } = useAppSelector(
    (state) => ({
      unreadMessageCount: state.user.unreadMessageCount
    }),
    shallowEqual
  )

  return (
    <div className="v1-user-info group relative flex justify-center items-center ml-1 cursor-pointer">
      {/* Avatar */}
      <div className="user-avatar">
        <div className="flex items-center overflow-hidden rounded-full w-10 h-10">
          {userInfo?.avatar_url ? (
            <Image
              className="object-cover"
              src={userInfo.avatar_url}
              fill
              sizes="100%"
              alt="user-avatar"
            />
          ) : (
            <Avatar
              size={35}
              name={String(userInfo?.id)}
              variant="beam"
              colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
            />
          )}
        </div>
        {unreadMessageCount !== 0 && <NoticeDot />}
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
          path={NOTIFICATION_PATH}
          iconName="icon-notification"
          text={unreadMessageCount === 0 ? '消息' : `未读消息(${unreadMessageCount})`}
        />

        <SubmenuItem isActive={false} handleClick={handleLogout}>
          <div className="submenu-item-link inline-block w-full h-full px-[15px] py-[3px] cursor-pointer">
            <i className={`icon iconfont icon-exit mr-[2px]`} />
            <span className="text">退出</span>
          </div>
        </SubmenuItem>
      </SubmenuWrap>
    </div>
  )
})

export default V1UserInfo
V1UserInfo.displayName = 'V1UserInfo'
