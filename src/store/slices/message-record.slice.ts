import {
  IMessageListItem,
  IMessageTotal,
  getMessageListByState,
  getMessageTotal,
} from '@/service/modules/message-record.request'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReduxState } from '..'
import sortMessages from '@/utils/sort-messages'
import pageToOffsetLimit from '@/utils/page-to-offsetlimit'

// Types
export interface IMessaegRecordSliceState {
  total: IMessageTotal
  unReadMessageList: IMessageListItem[] | []
  allMessageList: IMessageListItem[] | []
  pages: {
    unReadPage: number
    allPage: number
  }
}

// Thunks
const fetchMessageTotalAction = createAsyncThunk(
  'messageRecord/fetchMessageTotalAction',
  async (userId: number) => {
    return await getMessageTotal(userId)
  },
)
const fetchUnreadMessageListAction = createAsyncThunk(
  'messageRecord/fetchUnreadMessagesAction',
  async (_, { getState }) => {
    const userId = (getState() as ReduxState).user.userInfo?.id
    const messages = await getMessageListByState(userId!, '0', 0, 100)
    return sortMessages(messages)
  },
)
const fetchAllMessageListAction = createAsyncThunk(
  'messageRecord/fetchAllMessageListAction',
  async (_, { getState }) => {
    const userId = (getState() as ReduxState).user.userInfo?.id
    const allPage = (getState() as ReduxState).messageRecord.pages.allPage
    const { offset, limit } = pageToOffsetLimit(allPage)
    const messages = await getMessageListByState(userId!, undefined, offset, limit)
    return sortMessages(messages)
  },
)

export const messageRecordSlice = createSlice({
  name: 'messageRecord',
  initialState: {
    total: {
      unreadCount: 0,
      allCount: 0,
    },
    unReadMessageList: [],
    allMessageList: [],
    pages: {
      unReadPage: 1,
      allPage: 1,
    },
  } as IMessaegRecordSliceState,
  reducers: {
    tempClearUnreadCountAction(state) {
      state.total = { ...state.total, unreadCount: 0 }
    },
    addUnreadPage(state) {
      state.pages = { ...state.pages, unReadPage: state.pages.unReadPage + 1 }
    },
    addAllPage(state) {
      state.pages = { ...state.pages, allPage: state.pages.allPage + 1 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageTotalAction.fulfilled, (state, { payload }) => {
        state.total = payload ?? {}
      })
      .addCase(fetchUnreadMessageListAction.fulfilled, (state, { payload }) => {
        state.unReadMessageList = payload ?? []
      })
      .addCase(fetchAllMessageListAction.fulfilled, (state, { payload }) => {
        const headItemId = payload && payload[0]?.id
        if (!state.allMessageList.find((item) => item.id === headItemId)) {
          state.allMessageList = [...state.allMessageList, ...(payload ?? [])]
        }
      })
  },
})

export { fetchMessageTotalAction, fetchUnreadMessageListAction, fetchAllMessageListAction }
export const { tempClearUnreadCountAction, addAllPage, addUnreadPage } = messageRecordSlice.actions
