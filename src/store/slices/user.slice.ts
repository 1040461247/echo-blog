import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserInfo, login, verifyAuth } from '@/service/modules/user.request'

// Types
export interface IUserSliceState {
  userInfo: IUserInfo | null
}
export interface ILoginParamasters {
  name: string
  password: string
  browser_info: string
  os_info: string
  ip_address: string
}

// Thunks
const fetchLoginAction = createAsyncThunk(
  'user/fetchLoginAction',
  async (paramaters: ILoginParamasters) => {
    const { name, password, browser_info, os_info, ip_address } = paramaters
    const loginRes = await login(name, password, browser_info, os_info, ip_address)
    if (loginRes?.token) {
      localStorage.setItem('token', loginRes.token)
    }
  }
)
const fetchVerifyAuthAction = createAsyncThunk('user/fetchVerifyAuthAction', async () => {
  return await verifyAuth()
})

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null
  } as IUserSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVerifyAuthAction.fulfilled, (state, { payload }) => {
      state.userInfo = payload ?? null
    })
  }
})

export { fetchLoginAction, fetchVerifyAuthAction }
