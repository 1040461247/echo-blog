import {
  IMessageListItem,
  getMessageListByState,
  getMessageUnreadCount
} from '@/service/modules/message-record.request'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReduxState } from '..'

// Types
export interface IMessaegRecordSliceState {
  unreadMessageCount: number
  unReadMessageList: IMessageListItem[] | []
  allMessageList: IMessageListItem[] | []
}

// Thunks
const fetchMessageUnreadCountAction = createAsyncThunk(
  'messageRecord/fetchMessageUnreadCountAction',
  async (userId: number) => {
    return await getMessageUnreadCount(userId)
  }
)
const fetchUnreadMessageListAction = createAsyncThunk(
  'messageRecord/fetchUnreadMessagesAction',
  async (_, { getState }) => {
    const userId = (getState() as ReduxState).user.userInfo?.id
    return await getMessageListByState(userId!, '0')
  }
)
const fetchAllMessageListAction = createAsyncThunk(
  'messageRecord/fetchAllMessageListAction',
  async (_, { getState }) => {
    const userId = (getState() as ReduxState).user.userInfo?.id
    return await getMessageListByState(userId!)
  }
)

export const messageRecordSlice = createSlice({
  name: 'messageRecord',
  initialState: {
    unreadMessageCount: 0,
    unReadMessageList: [],
    allMessageList: []
  } as IMessaegRecordSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageUnreadCountAction.fulfilled, (state, { payload }) => {
        state.unreadMessageCount = payload?.unreadCount ?? 0
      })
      .addCase(fetchUnreadMessageListAction.fulfilled, (state, { payload }) => {
        state.unReadMessageList = payload ?? []
      })
      .addCase(fetchAllMessageListAction.fulfilled, (state, { payload }) => {
        state.allMessageList = payload ?? []
      })
  }
})

export { fetchMessageUnreadCountAction, fetchUnreadMessageListAction, fetchAllMessageListAction }
