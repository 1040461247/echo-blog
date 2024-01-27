import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NotificationUnreadPage: FC<IProps> = memo(() => {
  return <div className="notification-unread-page">hello NotificationUnreadPage</div>
})

export default NotificationUnreadPage
NotificationUnreadPage.displayName = 'NotificationUnreadPage'
