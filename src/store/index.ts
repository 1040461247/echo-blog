import { configureStore } from '@reduxjs/toolkit'
import { homeSlice, categorySlice, tagSlice } from './slices'

const store = configureStore({
  reducer: {
    [homeSlice.name]: homeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [tagSlice.name]: tagSlice.reducer
  }
})

export default store

// Types
export type ReduxStore = typeof store
export type ReduxState = ReturnType<typeof store.getState>
export type ReduxDispath = typeof store.dispatch
