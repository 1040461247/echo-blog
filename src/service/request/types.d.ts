import { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'

export interface Interceptors {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface AxiosRequestConfig extends InternalAxiosRequestConfig {
  interceptors?: Interceptors
  headers?: AxiosRequestHeaders
}
