import { useAppSelector } from '@/hooks/use-store'
import { usePathname } from 'next/navigation'
import { memo, type FC } from 'react'
import { shallowEqual } from 'react-redux'
import V1MenuList from './c-cpns/v1-menu-list'
import V1AuthBtn from './c-cpns/v1-auth-btn'
import V1UserInfo from './c-cpns/v1-user-info'
import { IMenuListItem } from '@/assets/data/menu-list-data'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HeaderMenuV1: FC<IProps> = memo(() => {
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  const actPathname = usePathname()
  function isActivePath(
    item: string[] | { path: string; children?: IMenuListItem[] } | IMenuListItem
  ) {
    // 当前路径的根路径等于某个菜单（或子菜单）路径时，菜单高亮
    const actPathList = actPathname.split('/')
    const actRootPath = `/${actPathList[1]}`

    if (Array.isArray(item)) {
      return item.includes(actRootPath)
    } else {
      if (item.children) {
        return !!item.children.find((subItem: any) => actRootPath === subItem.path!)
      } else {
        return actRootPath === item.path
      }
    }
  }

  return (
    <div className="header-menu-v1 hidden items-center md:flex">
      <V1MenuList isActivePath={isActivePath} />

      <div className="header-menu-user flex justify-center items-center">
        {userInfo ? (
          <V1UserInfo userInfo={userInfo} isActivePath={isActivePath} />
        ) : (
          <V1AuthBtn isActivePath={isActivePath} />
        )}
      </div>
    </div>
  )
})

export default HeaderMenuV1
HeaderMenuV1.displayName = 'HeaderMenuV1'
