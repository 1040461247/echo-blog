import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { ReduxState, ReduxDispath } from '@/store'

export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector
export const useAppDispatch: () => ReduxDispath = useDispatch
