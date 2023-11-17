import { memo } from 'react'
import BlogInfo from '@/components/blog-info'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ContentSidebar: FC<IProps> = memo(() => {
  return (
    <aside className="hidden md:block sticky top-[--ssm-sticky] sm:top-[--sm-sticky] md:top-[--md-sticky] w-60 h-56 mr-6">
      <div className=" c-card">
        <BlogInfo />
      </div>
    </aside>
  )
})

export default ContentSidebar
ContentSidebar.displayName = 'ContentSidebar'
