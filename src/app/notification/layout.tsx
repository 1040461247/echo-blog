'use client'

import { memo } from 'react'
import type { FC } from 'react'
import { useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import { usePathname } from 'next/navigation'
import { NOTIFICATION_PATH, NOTIFICATION_UNREAD_PATH } from '@/constants'
import Link from 'next/link'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NotificationPage: FC<IProps> = memo(({ children }) => {
  const pathname = usePathname()

  const { userInfo, unreadMessageCount } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo,
      unreadMessageCount: state.messageRecord.unreadMessageCount
    }),
    shallowEqual
  )

  // useEffect(() => {
  //   if (!userInfo) redirect(LOGIN_PATH)
  // }, [])

  const tabs = [
    {
      text: '全部消息',
      url: NOTIFICATION_PATH
    },
    {
      text: `未读消息(${unreadMessageCount})`,
      url: NOTIFICATION_UNREAD_PATH
    }
  ]

  return (
    <div className="notification-page sm:pt-[38px]">
      <div className="inner-layout flex-col items-start">
        <nav className="inline-flex gap-1 p-1 mb-3 bg-gray-300/5 rounded-lg">
          {tabs.map((item) => (
            <Link
              className={`px-10 py-3 rounded-lg transition-colors duration-300 ${
                pathname === item.url
                  ? 'text-gray-200 bg-[--bg-dark-blue]'
                  : 'text-gray-400 hover:bg-black/10'
              }`}
              key={item.url}
              href={item.url}
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <div className="content-card w-full p-8 text-gray-300">{children}</div>
      </div>
    </div>
  )
})

export default NotificationPage
NotificationPage.displayName = 'NotificationPage'
