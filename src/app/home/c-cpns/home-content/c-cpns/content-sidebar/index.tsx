import { memo } from 'react'
import Link from 'next/link'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentSidebar: FC<IProps> = memo(() => {
  return (
    <aside className="hidden sm:block sticky top-[--ssm-sticky] sm:top-[--sm-sticky] md:top-[--md-sticky] w-60 h-56 mr-6">
      <div className=" c-card">
        {/* Profile Area */}
        <div className="brief">
          <div className="pt-5">
            {/* Avatar */}
            <div className="overflow-hidden w-20 h-20 inline-block p-[1px] rounded-[18px] border border-solid border-gray-500 shadow-lg">
              <img
                className="w-[120%] overflow-hidden rounded-[18px]"
                src="/temp/avatar.png"
                alt="avatar"
              />
            </div>
          </div>
          {/* Name */}
          <div className="text-xl">
            <span>Cheems</span>
          </div>
          {/* Motto */}
          <div className="text-xs opacity-70">“站在巨人的肩膀上”</div>
        </div>
        {/* Statistics Area */}
        <nav className="flex items-center h-12 my-[10px]">
          <Link href="/archives" className="flex-1 flex flex-col">
            <span className="text-xl">17</span>
            <span className="text-xs opacity-70">文章</span>
          </Link>
          <Link href="/category" className="flex-1 flex flex-col">
            <span className="text-xl">5</span>
            <span className="text-xs opacity-70">分类</span>
          </Link>
          <Link href="/tags" className="flex-1 flex flex-col">
            <span className="text-xl">8</span>
            <span className="text-xs opacity-70">标签</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
})

export default ContentSidebar
ContentSidebar.displayName = 'ContentSidebar'
