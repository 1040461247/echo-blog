import SubmenuItem from '@/components/submenu-item'
import SubmenuWrap from '@/components/submenu-wrap'
import { PROFILE_PATH } from '@/constants'
import type { IUserInfo } from '@/service/modules/user.request'
import logout from '@/utils/user-logout'
import Avatar from 'boring-avatars'
import Image from 'next/image'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  userInfo: IUserInfo | null
  isActivePath: (item: any) => boolean
}

const V1UserInfo: FC<IProps> = memo(({ userInfo, isActivePath }) => {
  return (
    <div className="v1-user-info group relative flex justify-center cursor-pointer">
      {/* Avatar */}
      <div className="user-avatar overflow-hidden rounded-full w-10 h-10">
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
            size={40}
            name={userInfo?.name}
            variant="beam"
            colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
          />
        )}
      </div>

      {/* Submenu */}
      <SubmenuWrap>
        <SubmenuItem
          isActive={isActivePath({ path: PROFILE_PATH })}
          path={PROFILE_PATH}
          iconName="icon-user"
          text="个人中心"
        />
        <SubmenuItem isActive={false} handleClick={logout}>
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
