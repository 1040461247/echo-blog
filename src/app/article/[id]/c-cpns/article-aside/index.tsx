import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArticleAside: FC<IProps> = memo(() => {
  return (
    <aside className="article-aside hidden md:block sticky top-[108px] w-[205px] p-[10px]">
      aside
    </aside>
  )
})

export default ArticleAside
ArticleAside.displayName = 'ArticleAside'
