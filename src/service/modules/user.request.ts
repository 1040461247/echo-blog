import getAuthHeader from '@/utils/get-auth-header'
import request from '../index'
import { AM_USERS } from '@/constants'

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
  avatarUrl: string
  phoneNum: string
  browserInfo: string
  osInfo: string
  ipAddress: string
  updateTime: string
  createTime: string
  commentLikesId: number[]
}

// Services
async function login(
  name: string,
  password: string,
  browserInfo: string,
  osInfo: string,
  ipAddress: string,
) {
  const res = await request.post('/login', {
    body: JSON.stringify({ name, password, browserInfo, osInfo, ipAddress }),
    cache: 'no-store',
  })
  return res.data as ILoginRes
}

async function loginPhone(phone: string, otp: string) {
  const res = await request.post('/login-phone', {
    body: JSON.stringify({ phone, otp }),
    cache: 'no-store',
  })
  return res
}

async function logout() {
  const res = await request.post(`/logout`, {
    headers: getAuthHeader(),
  })
  return res
}

async function verifyAuth(token: string) {
  const res = await request.get('/authorized', {
    headers: { Authorization: token },
    cache: 'no-store',
  })
  return res.data as IAuthSalt
}

async function sendOtp(phone: string) {
  const res = await request.post('/send-otp', {
    body: JSON.stringify({ phone }),
    cache: 'no-store',
  })
  return res
}

async function uploadAvatar(formData: FormData) {
  const res = await request.post(`/upload/avatar`, {
    headers: getAuthHeader(),
    body: formData,
  })
  return res
}

async function signup(name: string, password: string, phoneNum: string) {
  const res = await request.post(AM_USERS, {
    body: JSON.stringify({ name, password, phoneNum }),
    cache: 'no-store',
  })
  return res
}

async function getUserById(userId: number) {
  const res = await request.get(`${AM_USERS}/${userId}`)
  return res.data as IUserInfo
}

async function updateUserInfo(name?: string, password?: string) {
  const bodyData = { name, password }
  const entriesBody = Object.entries(bodyData)
  const endBodyData = Object.fromEntries(entriesBody.filter(([_, value]) => value))

  const res = await request.post(`${AM_USERS}/update`, {
    headers: getAuthHeader(),
    body: JSON.stringify(endBodyData),
  })
  return res
}

export {
  login,
  loginPhone,
  logout,
  verifyAuth,
  sendOtp,
  signup,
  getUserById,
  uploadAvatar,
  updateUserInfo,
}
