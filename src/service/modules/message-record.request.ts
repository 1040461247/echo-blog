import getAuthHeader from '@/utils/get-auth-header'
import request from '../index'

// Types
export type TMessageType = '0' | '1' | '2' | '3' | '4'
export interface IMessageListItem {
  id: number
  messageType: TMessageType
  content: string
  linkAtcId: number
  creteTime: string
  sendUser: {
    id: number
    name: string
    avatarUrl: string
  }
}
export interface IUnreadCount {
  unreadCount: number
}
export type TState = '0' | '1'

const MODULE_BASE_URL = '/message-record'

async function getMessageUnreadCount(userId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${userId}/unread`)
  return res.data as IUnreadCount
}

async function clearUnread() {
  const res = await request.post(`${MODULE_BASE_URL}`, { headers: getAuthHeader() })
  return res
}

async function getMessageListByState(userId: number, state?: TState) {
  const res = await request.get(`${MODULE_BASE_URL}/${userId}${state ? `?state=${state}` : ''}`)
  return res.data as IMessageListItem[]
}

export { getMessageUnreadCount, clearUnread, getMessageListByState }
