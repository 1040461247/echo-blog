import menuList, { IMenuListItem } from '@/assets/data/menu-list-data'
import SubmenuItem from '@/components/submenu-item'
import SubmenuWrap from '@/components/submenu-wrap'
import Link from 'next/link'
import type { FC } from 'react'

import { memo } from 'react'
// Types
export interface IProps {
  children?: React.ReactElement
  isActivePath: (item: IMenuListItem) => boolean
}

const V1MenuList: FC<IProps> = memo(({ isActivePath }) => {
  // Common Styles
  const activeLinkStyle = `!text-[--primary-color] border-b-[3px] border-solid border-[--primary-color]`
  const linkStyle = `relative flex items-center px-[1.3021vw] py-2.5 text-gray-400 hover:!text-[--primary-color] hover:border-b-[3px] hover:border-solid hover:border-[--primary-color]`

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
    <nav className="v1-menu-list hidden items-center md:flex">
      {menuList.map((item) => (
        <div className="header-menu-item flex items-center h-full" key={item.text}>
          {item.children ? (
            // With subMenu
            <div
              className={`group relative flex justify-center header-item-link cursor-pointer ${linkStyle} ${
                isActivePath(item) ? activeLinkStyle : ''
              }`}
            >
              <i className={`iconfont ${item.icon} mr-1`} />
              <span>{item.text}</span>
              <i className="arrow iconfont icon-arrow ml-[2px] !text-xs font-bold transition-transform duration-200 group-hover:rotate-180" />
              {showSubMenu(item.children)}
            </div>
          ) : (
            // No subMenu
            <Link
              className={`header-item-link ${linkStyle} ${
                isActivePath(item) ? activeLinkStyle : ''
              }`}
              href={item.path ?? '#'}
            >
              <i className={`icon iconfont ${item.icon} mr-1`} />
              <span className="text">{item.text}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
})

export default V1MenuList
V1MenuList.displayName = 'V1MenuList'
