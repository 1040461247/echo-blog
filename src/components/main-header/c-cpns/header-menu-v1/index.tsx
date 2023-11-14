import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import menuList from '@/assets/data/main-header-menu'

// Import Types
import type { FC } from 'react'
import type { IMenuListItem } from '@/assets/data/main-header-menu'

const HeaderMenu: FC<IProps> = memo(() => {
  const pathname = usePathname()

  function showSubMenu(subMenu: IMenuListItem[]) {
    return (
      <ul className="hidden flex-col absolute top-full left-0 w-full p-[0.1333vw] bg-white rounded-[10px] group-hover:flex">
        {subMenu.map((item: IMenuListItem) => (
          <li
            className={classNames(
              'w-full h-[30px] px-[15px] py-[3px] text-center whitespace-nowrap rounded-xl text-black hover:header-active-sublink transition-colors',
              {
                'header-active-sublink': isActivePath(item)
              }
            )}
            key={item.text}
          >
            <Link className="submenu-item-link  " href={item.path!}>
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
    <ul className="hidden items-center md:flex">
      {menuList.map((item) => (
        <li className="flex items-center h-full" key={item.text}>
          {item.children ? (
            // With subMenu
            <div
              className={classNames(`group header-item-link`, {
                'header-active-link': isActivePath(item)
              })}
            >
              <i className={`iconfont ${item.icon} mr-1`} />
              <span>{item.text}</span>
              <i className="arrow iconfont icon-arrow ml-[2px] !text-xs font-bold transition-transform duration-200 group-hover:rotate-180" />
              {showSubMenu(item.children)}
            </div>
          ) : (
            // No subMenu
            <Link
              className={classNames('header-item-link', {
                'header-active-link': isActivePath(item)
              })}
              href={item.path ?? '#'}
            >
              <i className={`icon iconfont ${item.icon}`} />
              <span className="text">{item.text}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
})

export default HeaderMenu
HeaderMenu.displayName = 'HeaderMenu'

// Types
export interface IProps {
  children?: React.ReactElement
}
