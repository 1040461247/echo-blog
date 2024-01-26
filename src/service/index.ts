import { RequestInit } from 'next/dist/server/web/spec-extension/request'

// Types
export interface IResponse {
  code: number
  msg: string
  data: any
}

class myRequest {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(path: string, init?: RequestInit) {
    return await fetch(`${this.baseUrl}${path}`, { ...init })
      .then((res) => {
        if (!res.ok) {
          console.error(res)
          throw new Error(res.statusText)
        }
        return res.json() as Promise<IResponse>
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }

  async post(path: string, init?: RequestInit) {
    if (init?.body) {
      init.headers = {
        ...init.headers,
        'Content-Type': 'application/json'
      }
    }
    return await fetch(`${this.baseUrl}${path}`, { method: 'POST', ...init })
      .then((res) => {
        if (!res.ok) {
          console.error(res)
          throw new Error(res.statusText)
        }
        return res.json() as Promise<IResponse>
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }

  async delete(path: string, init?: RequestInit) {
    if (init?.body) {
      init.headers = {
        ...init.headers,
        'Content-Type': 'application/json'
      }
    }
    return await fetch(`${this.baseUrl}${path}`, { method: 'DELETE', ...init })
      .then((res) => {
        if (!res.ok) {
          console.error(res)
          throw new Error(res.statusText)
        }
        return res.json() as Promise<IResponse>
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err)
      })
  }
}

export default new myRequest(process.env.NEXT_PUBLIC_API_BASEURL)
