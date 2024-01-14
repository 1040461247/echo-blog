import { createSlice } from '@reduxjs/toolkit'
import { type IMessageQueueItem } from '@/components/message'

// Types
export interface IGlobalSliceState {
  messageQueue: IMessageQueueItem[] | []
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    messageQueue: []
  } as IGlobalSliceState,
  reducers: {
    pushMessageQueueAction(state, { payload }) {
      state.messageQueue = [...state.messageQueue, payload]
    },
    remMessageQueueByIdAction(state, { payload }) {
      const position = state.messageQueue.findIndex((item) => item.id === payload)
      state.messageQueue = state.messageQueue.filter((item, index) => index !== position)
    }
  }
})

export const { pushMessageQueueAction, remMessageQueueByIdAction } = globalSlice.actions
