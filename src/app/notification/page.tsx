'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { addAllPage, fetchAllMessageListAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import MessageItem from './c-cpns/message-item'
import { shallowEqual } from 'react-redux'
import NoMessage from './c-cpns/no-message'
import useReachBottom from '@/hooks/use-reach-bottom'
import NoContent from '@/components/no-content'
import BackTop from '@/components/backtop'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NotificationPage: FC<IProps> = memo(() => {
  // 获取数据
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchAllMessageListAction())
  }, [])

  const { allMessageList, total } = useAppSelector(
    (state) => ({
      allMessageList: state.messageRecord.allMessageList,
      total: state.messageRecord.total
    }),
    shallowEqual
  )

  // 滚动到底部加载更多
  const [reachedBottom] = useReachBottom()
  useEffect(() => {
    if (reachedBottom) {
      dispatch(addAllPage())
      dispatch(fetchAllMessageListAction())
    }
  }, [reachedBottom])

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
          {total.allCount === allMessageList.length && <NoContent />}
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
