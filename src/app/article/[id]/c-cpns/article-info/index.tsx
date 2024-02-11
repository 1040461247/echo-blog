import { memo } from 'react'
import Image from 'next/image'
import formatDate from '@/utils/format-date'
import ArticleTags from '@/components/article-tags'
import ArticleCategory from '@/components/article-category'
import type { FC } from 'react'

// Types
export interface ITagAndCate {
  id: number
  name: string
}
export interface IProps {
  children?: React.ReactElement
  author: any
  createTime: string
  updateTime: string
  tags: ITagAndCate[] | null
  category: ITagAndCate
  customStyle?: string
}

const ArticleInfo: FC<IProps> = memo(
  ({ author, createTime, updateTime, tags, category, customStyle }) => {
    return (
      <div className={`article-info flex items-center gap-2 mt-4 ${customStyle}`}>
        <div className="article-info-left overflow-hidden relative w-10 h-10 p-[1px] rounded-md border border-solid border-gray-500 shadow-lg">
          <Image
            src={author?.avatar_url ?? '/images/common/avatar.png'}
            fill
            sizes="100%"
            alt="avatar"
            className="object-contain"
          />
        </div>

        <div className="article-info-right flex-1">
          <div className="author-name text-lg">{author?.name}</div>
          <div className="other-info flex flex-wrap items-center gap-x-2 text-[13px] text-gray-300/60">
            <span className="create-time">
              <i className="iconfont icon-pen mr-1" />
              <span>{formatDate(createTime, 'YYYY-MM-DD hh:mm')}</span>
            </span>
            <span className="update-time">
              <i className="iconfont icon-wrench mr-1" />
              <span>{formatDate(updateTime, 'YYYY-MM-DD hh:mm')}</span>
            </span>
            <ArticleTags tagList={tags} />
            <ArticleCategory categoryInfo={category} />
          </div>
        </div>
      </div>
    )
  }
)

export default ArticleInfo
ArticleInfo.displayName = 'ArticleInfo'
