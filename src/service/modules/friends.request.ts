import { AM_FRIENDS, AM_FRIENDS_AUDIT } from '@/constants'
import request from '../index'

// Types
export interface IPassedListItem {
  id: number
  linkName: string
  linkUrl: string
  linkIcon: string
  linkDesc: string
}

const MODULE_BASE_URL = '/friend-links-audit'

async function commitFriends(
  linkName: string,
  linkUrl: string,
  linkIcon: string,
  linkDesc: string,
) {
  const res = await request.post(`${AM_FRIENDS_AUDIT}`, {
    body: JSON.stringify({ linkName, linkUrl, linkIcon, linkDesc }),
  })
  return res
}

async function getPassedList() {
  const res = await request.get(`${AM_FRIENDS}/passed`)
  return res.data as IPassedListItem[]
}

export { commitFriends, getPassedList }
