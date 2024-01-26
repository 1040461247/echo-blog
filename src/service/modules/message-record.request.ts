import getAuthHeader from '@/utils/get-auth-header'
import request from '../index'

// Types
interface IMessageRecordItem {
  id: number
  link: string
  content: string
  sendUser: {
    id: number
    name: string
    avatarUrl: string
  }
  createTime: string
}
export interface IMessageRecord {
  like: IMessageRecordItem[] | null
  read: IMessageRecordItem[] | null
  notice: IMessageRecordItem[] | null
  unRead: IMessageRecordItem[] | null
  comment: IMessageRecordItem[] | null
}
export interface IUnreadCount {
  unreadCount: number
}

const MODULE_BASE_URL = '/message-record'

async function getMessageList(userId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${userId}`)
  return res.data as IMessageRecord
}

async function getMessageUnreadCount(userId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${userId}/unread`)
  return res.data as IUnreadCount
}

async function clearUnread() {
  const res = await request.post(`${MODULE_BASE_URL}`, { headers: getAuthHeader() })
  return res
}

export { getMessageList, getMessageUnreadCount, clearUnread }
