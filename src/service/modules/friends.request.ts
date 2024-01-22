import request from '../index'

// Types
export interface IPassedListItem {
  id: number
  link_name: string
  link_url: string
  link_icon: string
  link_desc: string
}

const MODULE_BASE_URL = '/friend-links-audit'

async function commitFriends(
  linkName: string,
  linkUrl: string,
  linkIcon: string,
  linkDesc: string
) {
  const res = await request.post(`${MODULE_BASE_URL}`, {
    body: JSON.stringify({ linkName, linkUrl, linkIcon, linkDesc })
  })
  return res
}

async function getPassedList() {
  const res = await request.get(`${MODULE_BASE_URL}/passed`)
  return res.data as IPassedListItem[]
}

export { commitFriends, getPassedList }
