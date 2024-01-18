import { TOKEN } from '@/constants'
import { createAppAsyncThunk } from '@/hooks/use-store'
import { IUserInfo, getUserById, login, verifyAuth } from '@/service/modules/user.request'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Types
export interface IUserSliceState {
  userInfo: IUserInfo | null
  registeringPhone: string | null
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
      localStorage.setItem(TOKEN, loginRes.token)
    }
  }
)
const fetchVerifyAuthAction = createAsyncThunk(
  'user/fetchVerifyAuthAction',
  async (token?: string | null) => {
    token ??= localStorage.getItem(TOKEN)
    if (!token) return
    const tokenSalt = await verifyAuth(token)
    return await getUserById(tokenSalt.id)
  }
)
const fetchUserInfoAction = createAppAsyncThunk(
  'user/fetchUserInfoAction',
  async (_, { getState }) => {
    const state = getState()
    if (state.user.userInfo) {
      const tokenSalt = await getUserById(state.user.userInfo.id)
      return await getUserById(tokenSalt.id)
    }
  }
)

// const fetchUserInfoAction = createAsyncThunk<
//   IUserInfo | undefined,
//   number,
//   {
//     dispatch: ReduxDispath
//     state: ReduxState
//   }
// >('user/fetchUserInfoAction', async (_, { getState }) => {
//   const state = getState()
//   if (state.user.userInfo) {
//     const tokenSalt = await getUserById(state.user.userInfo.id)
//     return await getUserById(tokenSalt.id)
//   }
// })

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    registeringPhone: null
  } as IUserSliceState,
  reducers: {
    setRegisteringPhoneAction(state, { payload }) {
      state.registeringPhone = payload ?? null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVerifyAuthAction.fulfilled, (state, { payload }) => {
        state.userInfo = payload ?? null
      })
      .addCase(fetchUserInfoAction.fulfilled, (state, { payload }) => {
        state.userInfo = payload ?? null
      })
  }
})

export { fetchLoginAction, fetchVerifyAuthAction, fetchUserInfoAction }
export const { setRegisteringPhoneAction } = userSlice.actions
