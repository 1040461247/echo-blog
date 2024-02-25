import { IPassedListItem, getPassedList } from '@/service/modules/friends.request'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Types
export interface IFriendsSliceState {
  passedList: IPassedListItem[] | []
}

// Thunks
const fetchPassedListAction = createAsyncThunk('friends/fetchPassedListAction', async () => {
  return await getPassedList()
})

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    passedList: [],
  } as IFriendsSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPassedListAction.fulfilled, (state, { payload }) => {
      state.passedList = payload ?? []
    })
  },
})

export { fetchPassedListAction }
