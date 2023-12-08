import { configureStore } from '@reduxjs/toolkit'
import { homeSlice, categorySlice } from './slices'

const store = configureStore({
  reducer: {
    [homeSlice.name]: homeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer
  }
})

export default store

// Types
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispath = typeof store.dispatch
