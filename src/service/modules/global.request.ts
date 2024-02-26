import { AM_PAGEVIEWS, AM_USERS } from '@/constants'
import request from '../index'

// Types
export interface pvData {
  pvCount: number
}
export interface uvData {
  uvCount: number
}

// Services
async function recordPageview(pageUrl: string) {
  const res = await request.post(`${AM_PAGEVIEWS}`, { body: JSON.stringify({ pageUrl }) })
  return res
}

async function getPv(pageUrl?: string) {
  const res = await request.get(`${AM_PAGEVIEWS}/pv${pageUrl ? `?pageUrl=${pageUrl}` : ''}`)
  return res.data as pvData
}

async function getUv() {
  const res = await request.get(`${AM_PAGEVIEWS}/uv`)
  return res.data as uvData
}

export { recordPageview, getPv, getUv }
