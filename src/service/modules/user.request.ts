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
    const res = await request.post('/login', {
      body: JSON.stringify({ name, password, browser_info, os_info, ip_address }),
      cache: 'no-store'
    })
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as ILoginRes
  } catch (error) {
    console.error(error)
  }
}

async function verifyAuth(token: string) {
  try {
    const res = await request.get('/authorized', {
      headers: { Authorization: token },
      cache: 'no-store'
    })
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as IUserInfo
  } catch (error) {
    console.error(error)
  }
}

async function sendOtp(phone: string) {
  try {
    const res = await request.post('/send-otp', {
      body: JSON.stringify({ phone }),
      cache: 'no-store'
    })
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData
  } catch (error) {
    console.error(error)
  }
}

async function loginPhone(phone: string, otp: string) {
  try {
    const res = await request.post('/login-phone', {
      body: JSON.stringify({ phone, otp }),
      cache: 'no-store'
    })
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData
  } catch (error) {
    console.error(error)
  }
}

async function signup(name: string, password: string, phone_num: string) {
  try {
    const res = await request.post('/users', {
      body: JSON.stringify({ name, password, phone_num }),
      cache: 'no-store'
    })
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData
  } catch (error) {
    console.error(error)
  }
}

export { login, loginPhone, sendOtp, verifyAuth, signup }
