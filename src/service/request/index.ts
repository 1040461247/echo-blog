import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { AxiosRequestConfig } from './types'

export interface IRequest {
  code: number
  msg: string
  data?: any
}

class Request {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // Instance Interceptors
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )

    // Global Interceptors - Response
    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => Promise.reject(err)
    )
  }

  request(config: AxiosRequestConfig): Promise<IRequest> {
    return this.instance.request(config)
  }

  get(url: string, config?: AxiosRequestConfig) {
    let baseConfig: AxiosRequestConfig
    if (config) {
      baseConfig = { method: 'GET', url, ...config }
    } else {
      baseConfig = { method: 'GET', url }
    }

    return this.request(baseConfig)
  }

  post(url: string, config: AxiosRequestConfig) {
    return this.request({ method: 'POST', url, ...config })
  }
}

export default Request
