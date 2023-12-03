import Request from './request/index'
import { AxiosRequestConfig } from './request/types'

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  timeout: 5000
}

const request = new Request(baseConfig)

export default request
