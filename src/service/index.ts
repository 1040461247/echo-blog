import Request from './request/index'
import { API_BASEURL } from '@/global/config'

const request = new Request({
  baseURL: API_BASEURL,
  timeout: 1000 * 5
})

export default request
