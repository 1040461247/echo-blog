import { memo } from 'react'
import Link from 'next/link'
import { TAG_PATH } from '@/constants'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  tagList:
    | {
        id: number
        name: string
      }[]
    | null
  mobileHide?: boolean
}

const ArticleTags: FC<IProps> = memo(({ tagList, mobileHide = false }) => {
  return (
    tagList && (
      <span className={`article-tags ${mobileHide ? 'hidden md:flex' : 'flex items-center'}`}>
        <i className="iconfont icon-tags mr-1" />
        <nav>
          {tagList?.map((tag, index) => (
            <span key={tag.id}>
              <Link className="hover-highlight" href={`${TAG_PATH}/${tag.id}`}>
                {tag.name}
              </Link>
              {index !== tagList!.length - 1 && ' | '}
            </span>
          ))}
        </nav>
      </span>
    )
  )
})

export default ArticleTags
ArticleTags.displayName = 'ArticleTags'
