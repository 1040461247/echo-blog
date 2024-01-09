import { CATEGORY_PATH } from '@/constants'
import Link from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  categoryInfo: {
    id: number
    name: string
  }
  mobileHide?: boolean
}

const ArticleCategory: FC<IProps> = memo(({ categoryInfo = {}, mobileHide = false }) => {
  return (
    <span className={`article-categories ${mobileHide ? 'hidden md:flex' : 'flex items-center'}`}>
      <i className="iconfont icon-folder mr-1" />
      <Link className="hover-highlight" href={`${CATEGORY_PATH}/${categoryInfo.id}`}>
        {categoryInfo.name}
      </Link>
    </span>
  )
})

export default ArticleCategory
ArticleCategory.displayName = 'ArticleCategory'
