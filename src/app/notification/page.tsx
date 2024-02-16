'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { addAllPage, fetchAllMessageListAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import MessageItem from './c-cpns/message-item'
import { shallowEqual } from 'react-redux'
import NoMessage from './c-cpns/no-message'
import NoContent from '@/components/no-content'
import BackTop from '@/components/backtop'
import LoadMore from '@/components/load-more'
import useScroll from '@/hooks/use-scroll'

// Types
export interface IProps {}

const NotificationPage: FC<IProps> = memo(() => {
  const { allMessageList, total, userInfo } = useAppSelector(
    (state) => ({
      allMessageList: state.messageRecord.allMessageList,
      total: state.messageRecord.total,
      userInfo: state.user.userInfo
    }),
    shallowEqual
  )

  // 获取数据
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAllMessageListAction())
  }, [userInfo])

  // 滚动到底部加载更多
  const { reachBottom } = useScroll()
  useEffect(() => {
    if (reachBottom) {
      dispatch(addAllPage())
      dispatch(fetchAllMessageListAction())
    }
  }, [reachBottom])

  return (
    <div className="notification-page">
      {allMessageList.length > 0 ? (
        <>
          <div className="content-card overflow-hidden w-full text-gray-300 mb-10">
            <nav>
              {allMessageList.map((item) => (
                <MessageItem key={item.id} messageData={item} />
              ))}
            </nav>
          </div>
          {total.allCount === allMessageList.length ? <NoContent /> : <LoadMore />}
        </>
      ) : (
        <div className="content-card overflow-hidden w-full text-gray-300">
          <NoMessage />
        </div>
      )}
      <BackTop />
    </div>
  )
})

export default NotificationPage
NotificationPage.displayName = 'NotificationPage'
