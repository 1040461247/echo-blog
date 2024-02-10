'use client'

import { memo, useEffect } from 'react'
import type { FC } from 'react'
import MessageItem from '../c-cpns/message-item'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import {
  addUnreadPage,
  fetchUnreadMessageListAction,
  tempClearUnreadCountAction
} from '@/store/slices'
import NoMessage from '../c-cpns/no-message'
import { clearUnread } from '@/service/modules/message-record.request'
import useReachBottom from '@/hooks/use-reach-bottom'

// Types
export interface IProps {}

const NotificationUnreadPage: FC<IProps> = memo(() => {
  // 获取数据
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUnreadMessageListAction())
    dispatch(tempClearUnreadCountAction())
    setTimeout(() => clearUnread(), 100)
  }, [])

  const { unReadMessageList } = useAppSelector(
    (state) => ({
      unReadMessageList: state.messageRecord.unReadMessageList
    }),
    shallowEqual
  )

  // 滚动到底部加载更多
  const [reachedBottom] = useReachBottom()
  useEffect(() => {
    if (reachedBottom) {
      dispatch(addUnreadPage())
      dispatch(fetchUnreadMessageListAction())
    }
  }, [reachedBottom])

  return (
    <div className="notification-unread-page">
      {unReadMessageList.length > 0 ? (
        <div className="content-card overflow-hidden w-full text-gray-300 mb-10">
          <nav>
            {unReadMessageList.map((item) => (
              <MessageItem key={item.id} messageData={item} />
            ))}
          </nav>
        </div>
      ) : (
        <div className="content-card overflow-hidden w-full text-gray-300">
          <NoMessage />
        </div>
      )}
    </div>
  )
})

export default NotificationUnreadPage
NotificationUnreadPage.displayName = 'NotificationUnreadPage'
