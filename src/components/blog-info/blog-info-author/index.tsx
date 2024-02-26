'use client'

import UserAvatar from '@/components/user-avatar'
import { useAppSelector } from '@/hooks/use-store'
import { IUserInfo } from '@/service/modules/user.request'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
}

const BlogInfoAuthor: FC<IProps> = memo(() => {
  const [authorInfo, setAuthorInfo] = useState<IUserInfo | Record<string, never>>({})

  const { blogAuthorInfo } = useAppSelector(
    (state) => ({
      blogAuthorInfo: state.home.blogAuthorInfo,
    }),
    shallowEqual,
  )

  useEffect(() => {
    if (blogAuthorInfo) {
      setAuthorInfo(blogAuthorInfo)
    }
  }, [blogAuthorInfo])

  return (
    <div className="blog-info-author flex flex-col gap-1 items-center">
      <div className="pt-5">
        {/* Avatar */}
        <div className="overflow-hidden p-[1px] rounded-[18px] border border-solid border-gray-500 shadow-lg">
          <UserAvatar avatarUrl={authorInfo.avatarUrl} size={70} square />
        </div>
      </div>
      {/* NickName */}
      <div className="text-xl">
        <span>{authorInfo.name}</span>
      </div>
      {/* Motto */}
      <div className="text-xs opacity-70">“{authorInfo.motto}”</div>
    </div>
  )
})

export default BlogInfoAuthor
BlogInfoAuthor.displayName = 'BlogInfoAuthor'
