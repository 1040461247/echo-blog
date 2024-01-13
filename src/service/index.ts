import { RequestInit } from 'next/dist/server/web/spec-extension/request'

class myRequest {
  constructor(public baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(path: string, init?: RequestInit) {
    return await fetch(`${this.baseUrl}${path}`, { method: 'GET', ...init })
  }

  async post(path: string, init?: RequestInit) {
    if (init?.body) {
      init.headers = {
        'Content-Type': 'application/json'
      }
    }
    return await fetch(`${this.baseUrl}${path}`, { method: 'POST', ...init })
  }
}

export default new myRequest(process.env.NEXT_PUBLIC_API_BASEURL)
