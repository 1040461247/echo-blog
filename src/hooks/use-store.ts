import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { ReduxState, ReduxDispath } from '@/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector
export const useAppDispatch: () => ReduxDispath = useDispatch
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxState
  dispatch: ReduxDispath
  rejectValue?: unknown
  extra?: unknown
}>()
