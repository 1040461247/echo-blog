'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchAllMessageListAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import MessageItem from './c-cpns/message-item'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NotificationPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  const { allMessageList } = useAppSelector(
    (state) => ({
      allMessageList: state.messageRecord.allMessageList
    }),
    shallowEqual
  )

  useEffect(() => {
    if (allMessageList.length === 0) dispatch(fetchAllMessageListAction())
  }, [allMessageList])

  return (
    <div className="notification-page">
      {allMessageList.map((item) => (
        <MessageItem key={item.id} messageData={item} />
      ))}
    </div>
  )
})

export default NotificationPage
NotificationPage.displayName = 'NotificationPage'
