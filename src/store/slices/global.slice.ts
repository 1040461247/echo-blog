import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { type IMessageQueueItem } from '@/components/message'
import { getPv, getUv } from '@/service/modules/global.request'

// Types
export interface IGlobalSliceState {
  messageQueue: IMessageQueueItem[] | []
  uv: number
  pv: number
}

// Thunks
const fetchUvAction = createAsyncThunk('global/fetchUvAction', async () => {
  return await getUv()
})
const fetchTotalPvAction = createAsyncThunk('global/fetchPvAction', async () => {
  return await getPv()
})

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    messageQueue: [],
    uv: 0,
    pv: 0,
  } as IGlobalSliceState,
  reducers: {
    pushMessageQueueAction(state, { payload }) {
      state.messageQueue = [...state.messageQueue, payload]
    },
    remMessageQueueByIdAction(state, { payload }) {
      const position = state.messageQueue.findIndex((item) => item.id === payload)
      state.messageQueue = state.messageQueue.filter((_, index) => index !== position)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUvAction.fulfilled, (state, { payload }) => {
        state.uv = payload.uvCount ?? 0
      })
      .addCase(fetchTotalPvAction.fulfilled, (state, { payload }) => {
        state.pv = payload.pvCount ?? 0
      })
  },
})

export const { pushMessageQueueAction, remMessageQueueByIdAction } = globalSlice.actions
export { fetchUvAction, fetchTotalPvAction }
