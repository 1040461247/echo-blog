import type { FC } from 'react'
import { memo } from 'react'
import BlogInfoStatistics from './blog-info-statistics'
import BlogInfoAuthor from './blog-info-author'

// Types
export interface IProps {
  children?: React.ReactElement
  clouseDrawer?: () => void
}

const BlogInfo: FC<IProps> = memo(({ clouseDrawer }) => {
  return (
    <div className="blog-info">
      <BlogInfoAuthor />
      <BlogInfoStatistics handleClouseDrawer={clouseDrawer} />
    </div>
  )
})

export default BlogInfo
BlogInfo.displayName = 'BlogInfo'
