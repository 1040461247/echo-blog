import getAuthHeader from '@/utils/get-auth-header'
import request from '../index'

// Types
export interface ILoginRes {
  id: number
  name: string
  token: string
}
export interface IAuthSalt {
  id: number
  iat: number
  exp: number
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
  commentLikesId: number[]
}

async function login(
  name: string,
  password: string,
  browser_info: string,
  os_info: string,
  ip_address: string
) {
  const res = await request.post('/login', {
    body: JSON.stringify({ name, password, browser_info, os_info, ip_address }),
    cache: 'no-store'
  })
  return res.data as ILoginRes
}

async function verifyAuth(token: string) {
  const res = await request.get('/authorized', {
    headers: { Authorization: token },
    cache: 'no-store'
  })
  return res.data as IAuthSalt
}

async function sendOtp(phone: string) {
  const res = await request.post('/send-otp', {
    body: JSON.stringify({ phone }),
    cache: 'no-store'
  })
  return res
}

async function loginPhone(phone: string, otp: string) {
  const res = await request.post('/login-phone', {
    body: JSON.stringify({ phone, otp }),
    cache: 'no-store'
  })
  return res
}

async function signup(name: string, password: string, phone_num: string) {
  const res = await request.post('/users', {
    body: JSON.stringify({ name, password, phone_num }),
    cache: 'no-store'
  })
  return res
}

async function getUserById(userId: number) {
  const res = await request.get(`/users/${userId}`)
  return res.data as IUserInfo
}

async function uploadAvatar(formData: FormData) {
  const res = await request.post(`/upload/avatar`, {
    headers: getAuthHeader(),
    body: formData
  })
  return res
}

async function updateUserInfo(name?: string, password?: string) {
  const bodyData = { name, password }
  const entriesBody = Object.entries(bodyData)
  const endBodyData = Object.fromEntries(entriesBody.filter(([_, value]) => value))

  const res = await request.post(`/users/update`, {
    headers: getAuthHeader(),
    body: JSON.stringify(endBodyData)
  })
  return res
}

export { login, loginPhone, sendOtp, verifyAuth, signup, getUserById, uploadAvatar, updateUserInfo }
