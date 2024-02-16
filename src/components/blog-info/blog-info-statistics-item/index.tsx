import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  text: string
  count: number
  linkHref: string
  handleClouseDrawer?: () => void
}

const BlogInfoStatisticsItem: FC<IProps> = memo(({ text, count, linkHref, handleClouseDrawer }) => {
  return (
    <Link href={linkHref} className="flex-1 flex flex-col" onClick={handleClouseDrawer}>
      <span className="text-xl">{count}</span>
      <span className="text-xs opacity-70">{text}</span>
    </Link>
  )
})

export default BlogInfoStatisticsItem
BlogInfoStatisticsItem.displayName = 'BlogInfoStatisticsItem'
