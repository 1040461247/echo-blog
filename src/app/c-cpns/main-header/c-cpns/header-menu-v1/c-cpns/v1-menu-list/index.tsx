import menuList, { IMenuListItem } from '@/assets/data/menu-list-data'
import SubmenuItem from '@/components/submenu-item'
import SubmenuWrap from '@/components/submenu-wrap'
import type { FC } from 'react'

import { memo } from 'react'
import V1MenuItem from '../v1-menu-item'
// Types
export interface IProps {
  children?: React.ReactElement
  isActivePath: (item: IMenuListItem) => boolean
}

const V1MenuList: FC<IProps> = memo(({ isActivePath }) => {
  function showSubMenu(subMenu: IMenuListItem[]) {
    // Show Submenu
    return (
      <SubmenuWrap>
        {subMenu.map((item: IMenuListItem) => (
          <SubmenuItem
            key={item.text}
            isActive={isActivePath(item)}
            path={item.path}
            iconName={item.icon}
            text={item.text}
          />
        ))}
      </SubmenuWrap>
    )
  }

  return (
    <nav className="v1-menu-list hidden items-center sm:flex">
      {menuList.map((item) => (
        <div className="header-menu-item flex items-center h-full" key={item.text}>
          {item.children ? (
            // With subMenu
            <V1MenuItem
              isLink={false}
              isActive={isActivePath(item)}
              iconName={item.icon}
              text={item.text}
            >
              <>
                <i className="arrow iconfont icon-arrow ml-1 !text-xs font-bold transition-transform duration-300 group-hover:rotate-180" />
                {showSubMenu(item.children)}
              </>
            </V1MenuItem>
          ) : (
            // No subMenu
            <V1MenuItem
              isLink
              path={item.path}
              isActive={isActivePath(item)}
              iconName={item.icon}
              text={item.text}
            />
          )}
        </div>
      ))}
    </nav>
  )
})

export default V1MenuList
V1MenuList.displayName = 'V1MenuList'
