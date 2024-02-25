import getAuthHeader from '@/utils/get-auth-header'
import request from '../index'

// Types
export type TMessageType = '0' | '1' | '2' | '3' | '4'
export interface IMessageListItem {
  id: number
  messageType: TMessageType
  content: string
  linkAtcId: number
  createTime: string
  sendUser: {
    id: number
    name: string
    avatarUrl: string
  }
}
export interface IMessageTotal {
  unreadCount: number
  allCount: number
}
export type TState = '0' | '1'

const MODULE_BASE_URL = '/message-record'

async function getMessageTotal(userId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${userId}/total`)
  return res.data as IMessageTotal
}

async function getMessageListByState(userId: number, state?: TState, offset = 0, limit = 10) {
  const res = await request.get(
    `${MODULE_BASE_URL}/${userId}?offset=${offset}&limit=${limit}${state ? `&state=${state}` : ''}`,
  )
  return res.data as IMessageListItem[]
}

async function clearUnread() {
  const res = await request.post(`${MODULE_BASE_URL}`, { headers: getAuthHeader() })
  return res
}

export { getMessageTotal, getMessageListByState, clearUnread }
