import { memo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import menuListData from '@/assets/data/menu-list-data'
import Drawer from '@/components/drawer'
import BlogInfo from '@/components/blog-info'
import type { IMenuListItem } from '@/assets/data/menu-list-data'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const HeaderMenubutton: FC<IProps> = memo(() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function showMenuList(menuList: IMenuListItem[], res: any[] = []) {
    for (const menu of menuList) {
      // 平级展示每个菜单项
      if (menu.children) {
        showMenuList(menu.children, res)
      } else {
        res.push(
          <Link
            className="menu-item flex justify-center items-center overflow-hidden rounded-md h-9 p-[1px] mb-2 bg-[--btn-gray]"
            href={menu.path!}
            key={menu.text}
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="menu-item-inner flex-1 overflow-hidden rounded-md text-gray-300 text-center active:text-white">
              <i className={`iconfont ${menu.icon} mr-1`}></i>
              <span>{menu.text}</span>
            </span>
          </Link>
        )
      }
    }
    return res
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
          <nav className="menu-list">{showMenuList(menuListData)}</nav>
        </div>
      </Drawer>
    </div>
  )
})

export default HeaderMenubutton
HeaderMenubutton.displayName = 'HeaderMenubutton'
