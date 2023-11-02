'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import './index.scss'
import '@/assets/iconfont/main-header/iconfont.css'
import menuList from '@/assets/data/main-header-menu'

// Import Types
import type { FC } from 'react'
import type { IMenuListItem } from '@/assets/data/main-header-menu'

const MainHeader: FC<IProps> = memo(() => {
  const pathname = usePathname()

  function showSubMenu(subMenu: IMenuListItem[]) {
    return (
      <ul className="submenu">
        {subMenu.map((item: IMenuListItem) => (
          <li className="submenu-item" key={item.text}>
            <Link className="submenu-item-link" href={item.path!}>
              <i className={classNames('icon', 'iconfont', item.icon)} />
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  function isActivePath(item: IMenuListItem) {
    if (item.children) {
      return !!item.children.find((subItem) => subItem.path === pathname)
    } else {
      return item.path === pathname
    }
  }

  return (
    <header className="main-header">
      <div className="inner">
        <div className="logo">
          <Image src="/images/main-header/logo.svg" width={46} height={46} alt="logo" />
          <h1>Echo Blog</h1>
        </div>

        <ul className="menu">
          {menuList.map((item) => (
            <li className="menu-item" key={item.text}>
              {item.children ? (
                <div
                  className={classNames('menu-item-link', { 'active-link': isActivePath(item) })}
                >
                  <i className={`icon iconfont ${item.icon}`} />
                  <span className="text">{item.text}</span>
                  <i className="arrow iconfont icon-arrow" />
                  {showSubMenu(item.children)}
                </div>
              ) : (
                <Link
                  className={classNames('menu-item-link', { 'active-link': isActivePath(item) })}
                  href={item.path ?? '#'}
                >
                  <i className={`icon iconfont ${item.icon}`} />
                  <span className="text">{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
})

export default MainHeader
MainHeader.displayName = 'MainHeader'

// Types
export interface IProps {
  children?: React.ReactElement
}
