import menuListData from '@/assets/data/menu-list-data'
import BlogInfo from '@/components/blog-info'
import Drawer from '@/components/drawer'
import { useAppSelector } from '@/hooks/use-store'
import Image from 'next/image'
import { memo, useState } from 'react'
import { shallowEqual } from 'react-redux'
import V2MenuItem from './c-cpns/v2-menu-item'
import useLogout from '@/hooks/use-logout'
import Message from '@/components/message'
import dynamic from 'next/dynamic'
import ComponentLoading from '@/components/component-loading'
import type { IMenuListItem } from '@/assets/data/menu-list-data'
import type { FC } from 'react'

// Dynamic Import
const V2UserNav = dynamic(() => import('./c-cpns/v2-user-nav'), {
  loading: () => <ComponentLoading />
})
const V2AuthNav = dynamic(() => import('./c-cpns/v2-auth-nav'), {
  loading: () => <ComponentLoading />
})

// Types
export interface IProps {
  children?: React.ReactElement
}

const HeaderMenubutton: FC<IProps> = memo(() => {
  const logout = useLogout()
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
    Message.success('用户已退出')
  }

  return (
    <div className="sm:hidden">
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
                <V2UserNav setIsDrawerOpen={setIsDrawerOpen} handleLogout={handleLogout} />
              ) : (
                <V2AuthNav setIsDrawerOpen={setIsDrawerOpen} />
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
