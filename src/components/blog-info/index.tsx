'use client'

import profileJson from '@/assets/data/profile.json'
import { ARCHIVES_PATH, CATEGORY_PATH, TAG_PATH } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchStatisticsAction } from '@/store/slices'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
  clouseDrawer?: () => void
}

const BlogInfo: FC<IProps> = memo(({ clouseDrawer }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchStatisticsAction())
  }, [])

  const { statistics } = useAppSelector(
    (state) => ({
      statistics: state.home.statistics
    }),
    shallowEqual
  )

  function handleClouseDrawer() {
    if (clouseDrawer) {
      clouseDrawer()
    }
  }

  return (
    <div className="blog-info">
      <div className="profile flex flex-col items-center">
        <div className="pt-5">
          {/* Avatar */}
          <div className="overflow-hidden relative w-20 h-20 inline-block p-[1px] rounded-[18px] border border-solid border-gray-500 shadow-lg">
            <Image
              src={profileJson.avatar_url}
              fill
              sizes="100%"
              alt="avatar"
              className="object-contain"
            />
          </div>
        </div>
        {/* NickName */}
        <div className="text-xl">
          <span>{profileJson.nickName}</span>
        </div>
        {/* Motto */}
        <div className="text-xs opacity-70">{profileJson.motto}</div>
      </div>

      <nav className="statistics flex items-center h-12 my-[10px] text-center">
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
      </nav>
    </div>
  )
})

export default BlogInfo
BlogInfo.displayName = 'BlogInfo'
