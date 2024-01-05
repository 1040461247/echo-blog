import request from '../index'

// Types
export interface ILoginRes {
  id: number
  name: string
  token: string
}
export interface IUserInfo {
  id: number
  name: string
  avatar_url: string
  phone_num: string
  browser_info: string
  os_info: string
  ip_address: string
  update_time: string
  create_time: string
  iat: number
  exp: number
}

async function login(
  name: string,
  password: string,
  browser_info: string,
  os_info: string,
  ip_address: string
) {
  try {
    const res: any = await request.post('/login', {
      data: { name, password, browser_info, os_info, ip_address }
    })
    return res.data as ILoginRes
  } catch (error) {
    console.error(error)
  }
}

async function verifyAuth(token: string) {
  try {
    const res: any = await request.get('/authorized', { headers: { Authorization: token } })
    return res.data as IUserInfo
  } catch (error) {
    console.error(error)
  }
}

export { login, verifyAuth }
