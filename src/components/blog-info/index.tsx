import profileJson from '@/assets/data/profile.json'
import type { FC } from 'react'
import { memo } from 'react'
import UserAvatar from '../user-avatar'
import BlogInfoStatistics from './blog-info-statistics'

// Types
export interface IProps {
  children?: React.ReactElement
  clouseDrawer?: () => void
}

const BlogInfo: FC<IProps> = memo(({ clouseDrawer }) => {
  return (
    <div className="blog-info">
      <div className="profile flex flex-col gap-1 items-center">
        <div className="pt-5">
          {/* Avatar */}
          <div className="overflow-hidden p-[1px] rounded-[18px] border border-solid border-gray-500 shadow-lg">
            <UserAvatar avatarUrl={profileJson.avatar_url} size={70} square />
          </div>
        </div>
        {/* NickName */}
        <div className="text-xl">
          <span>{profileJson.nickName}</span>
        </div>
        {/* Motto */}
        <div className="text-xs opacity-70">{profileJson.motto}</div>
      </div>

      <BlogInfoStatistics handleClouseDrawer={clouseDrawer} />

      {/* <nav className="statistics flex items-center h-12 my-[10px] text-center">
        <Link href={ARCHIVES_PATH} className="flex-1 flex flex-col" onClick={handleClouseDrawer}>
          <span className="text-xl">{statistics.articlesCount}</span>
          <span className="text-xs opacity-70">文章</span>
        </Link>
        <Link href={CATEGORY_PATH} className="flex-1 flex flex-col" onClick={handleClouseDrawer}>
          <span className="text-xl">{statistics.categoriesCount}</span>
          <span className="text-xs opacity-70">分类</span>
        </Link>
        <Link href={TAG_PATH} className="flex-1 flex flex-col" onClick={handleClouseDrawer}>
          <span className="text-xl">{statistics.tagsCount}</span>
          <span className="text-xs opacity-70">标签</span>
        </Link>
      </nav> */}
    </div>
  )
})

export default BlogInfo
BlogInfo.displayName = 'BlogInfo'
