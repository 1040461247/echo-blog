import type { IMenuListItem } from '@/assets/data/menu-list-data'
import menuListData from '@/assets/data/menu-list-data'
import BlogInfo from '@/components/blog-info'
import Drawer from '@/components/drawer'
import { PROFILE_PATH } from '@/constants'
import { useAppSelector } from '@/hooks/use-store'
import logout from '@/utils/logout'
import Image from 'next/image'
import type { FC } from 'react'
import { memo, useState } from 'react'
import { shallowEqual } from 'react-redux'
import V2MenuItem from './c-cpns/v2-menu-item'

// Types
export interface IProps {
  children?: React.ReactElement
  handleModal: (isOpen: boolean) => void
}

const HeaderMenubutton: FC<IProps> = memo(({ handleModal }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  function showMenuList(menuList: IMenuListItem[], res: any[] = []) {
    for (const menu of menuList) {
      // 平级展示每个菜单项
      if (menu.children) {
        showMenuList(menu.children, res)
      } else {
        res.push(
          <V2MenuItem
            isLink
            path={menu.path!}
            iconName={menu.icon}
            text={menu.text}
            key={menu.text}
            handleClick={() => setIsDrawerOpen(false)}
          />
        )
      }
    }
    return res
  }

  // Handles
  function handleLogout() {
    setIsDrawerOpen(false)
    logout()
  }
  function handleOauth() {
    setIsDrawerOpen(false)
    handleModal(true)
  }

  return (
    <div className="md:hidden">
      {/* MenuBtn */}
      <div className="flex items-center h-full px-2" onClick={() => setIsDrawerOpen(true)}>
        <Image src="/images/main-header/menu.svg" width={25} height={25} alt="menubtn"></Image>
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="drawer-content pb-8">
          <div className="blog-info-wrap text-gray-200">
            <BlogInfo clouseDrawer={() => setIsDrawerOpen(false)} />
          </div>
          <div className="menu-list">
            <nav className="normal-list">{showMenuList(menuListData)}</nav>
            <nav className="user-list">
              {userInfo ? (
                <div className="user-info">
                  <V2MenuItem
                    text="个人中心"
                    isLink
                    path={PROFILE_PATH}
                    iconName="icon-home"
                    handleClick={() => setIsDrawerOpen(false)}
                  />
                  <V2MenuItem
                    text="退出"
                    isLink={false}
                    iconName="icon-tags"
                    handleClick={handleLogout}
                  />
                </div>
              ) : (
                <div className="oauth">
                  <V2MenuItem
                    isLink={false}
                    iconName="icon-home"
                    text="登录/注册"
                    handleClick={() => handleOauth(true)}
                  />
                </div>
              )}
            </nav>
          </div>
        </div>
      </Drawer>
    </div>
  )
})

export default HeaderMenubutton
HeaderMenubutton.displayName = 'HeaderMenubutton'
