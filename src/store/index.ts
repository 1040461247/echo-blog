import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slices'

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer
  }
})

export default store

// Types
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispath = typeof store.dispatch
