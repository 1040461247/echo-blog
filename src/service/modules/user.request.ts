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
      data: { name, password, browser_info, os_info, ip_address }
    })
    if (res.code >= 200 && res.code < 300) {
      return res.data as ILoginRes
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function verifyAuth(token: string) {
  try {
    const res = await request.get('/authorized', { headers: { Authorization: token } })
    if (res.code >= 200 && res.code < 300) {
      return res.data as IUserInfo
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function sendOtp(phone: string) {
  try {
    const res = await request.post('/send-otp', { data: { phone } })
    if (res.code >= 200 && res.code < 300) {
      return res
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function loginPhone(phone: string, otp: string) {
  try {
    const res = await request.post('/login-phone', {
      data: { phone, otp }
    })
    if (res.code >= 200 && res.code < 300) {
      return res
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

export { login, loginPhone, sendOtp, verifyAuth }
