import request from '../index'

// Types
export interface pvData {
  pvCount: number
}
export interface uvData {
  uvCount: number
}

const MODULE_BASE_URL = '/pageviews'

async function recordPageview(pageUrl: string) {
  const res = await request.post(`${MODULE_BASE_URL}`, { body: JSON.stringify({ pageUrl }) })
  return res
}

async function getPv(pageUrl?: string) {
  const res = await request.get(`${MODULE_BASE_URL}/pv${pageUrl ? `?pageUrl=${pageUrl}` : ''}`)
  return res.data as pvData
}

async function getUv() {
  const res = await request.get(`${MODULE_BASE_URL}/uv`)
  return res.data as uvData
}

export { recordPageview, getPv, getUv }
