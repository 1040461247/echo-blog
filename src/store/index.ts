import { configureStore } from '@reduxjs/toolkit'
import { homeSlice } from './slices'

const store = configureStore({
  reducer: {
    [homeSlice.name]: homeSlice.reducer
  }
})

export default store

// Types
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispath = typeof store.dispatch
