import { useAppSelector } from '@/hooks/use-store'
import { usePathname } from 'next/navigation'
import { memo, type FC } from 'react'
import { shallowEqual } from 'react-redux'
import V1MenuList from './c-cpns/v1-menu-list'
import V1OauthBtn from './c-cpns/v1-oauth-btn'
import V1UserInfo from './c-cpns/v1-user-info'

// Types
export interface IProps {
  children?: React.ReactElement
  handleModal: (isOpen: boolean) => void
}

const HeaderMenuV1: FC<IProps> = memo(({ handleModal }) => {
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  const actPathname = usePathname()
  function isActivePath(item: any) {
    // 当前路径的根路径等于某个菜单（或子菜单）路径时，菜单高亮
    const actPathList = actPathname.split('/')
    const actRootPath = `/${actPathList[1]}`
    if (item.children) {
      return !!item.children.find((subItem: any) => actRootPath === subItem.path!)
    } else {
      return actRootPath === item.path
    }
  }

  return (
    <div className="header-menu-v1 hidden items-center md:flex">
      <V1MenuList isActivePath={isActivePath} />
      <div className="header-menu-user flex justify-center items-center ml-[0.5vw]">
        {userInfo ? (
          <V1UserInfo userInfo={userInfo} isActivePath={isActivePath} />
        ) : (
          <V1OauthBtn handleModal={handleModal} />
        )}
      </div>
    </div>
  )
})

export default HeaderMenuV1
HeaderMenuV1.displayName = 'HeaderMenuV1'
