import { memo } from 'react'
import BlogInfo from '@/components/blog-info'
import type { FC } from 'react'
import menuList, { type IMenuListItem } from '@/assets/data/menu-list-data'
import Link from 'next/link'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentSidebar: FC<IProps> = memo(() => {
  function filterAndSortMenu(
    menus: IMenuListItem[],
    filterList: string[],
    resMenu: IMenuListItem[] = [],
  ) {
    for (const menu of menus) {
      if (filterList.includes(menu.text)) {
        resMenu.push(menu)
      } else if (menu.children) {
        filterAndSortMenu(menu.children, filterList, resMenu)
      }
    }
    return resMenu.sort((a, b) => {
      return filterList.indexOf(a.text) - filterList.indexOf(b.text)
    })
  }

  return (
    <aside className="hidden sm:block flex-col gap-5 w-60 mr-6">
      <div className="sticky-wrap sticky sm:top-[--sm-sticky] md:top-[--md-sticky]">
        <div className="c-card mb-5">
          <header className="p-3 mb-3 border-b border-gray-600/50">
            <h2 className="text-xl">Echo Blog</h2>
          </header>
          <nav className="flex flex-col gap-2 pb-3">
            {filterAndSortMenu(menuList, ['作者', '友链', '时间轴', '分类', '标签']).map((item) => (
              <Link href={item.path!} key={item.text} className="hover-highlight">
                <i className={`iconfont ${item.icon} mr-1`} />
                <span>{item.text}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="c-card">
          <BlogInfo />
        </div>
      </div>
    </aside>
  )
})

export default ContentSidebar
ContentSidebar.displayName = 'ContentSidebar'
