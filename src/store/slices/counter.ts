import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increment(state, { payload }) {
      state.count += payload
    }
  }
})

export const { increment } = counterSlice.actions
