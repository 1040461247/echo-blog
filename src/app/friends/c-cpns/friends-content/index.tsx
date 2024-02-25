'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchPassedListAction } from '@/store/slices'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FriendsContent: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPassedListAction())
  }, [])

  const { passedList } = useAppSelector(
    (state) => ({
      passedList: state.friends.passedList,
    }),
    shallowEqual,
  )

  return (
    <main className="friends-content">
      <nav className="grid md:grid-cols-2 gap-4">
        {passedList.map((item) => (
          <Link
            className="group flex overflow-hidden rounded-lg border border-gray-600/50 hover:border-gray-600 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
            href={item.linkUrl}
            key={item.linkName}
            target="_blank"
          >
            <div className="friend-avatar relative w-16 h-16 bg-black/30">
              <Image className="boject-cover" src={item.linkIcon} fill alt="friend-avatar" />
            </div>
            <div className="friend-info flex flex-col justify-center gap-1 w-full px-3 overflow-hidden">
              <span className="friend-info-name text-lg group-hover:text-[--primary-color] transition-colors duration-300">
                {item.linkName}
              </span>
              <span className="friend-info-desc w-full ellipsis-1-line">{item.linkDesc}</span>
            </div>
          </Link>
        ))}
      </nav>
    </main>
  )
})

export default FriendsContent
FriendsContent.displayName = 'FriendsContent'
