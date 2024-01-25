import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStatistics, getArticleList } from '@/service/modules/home.request'
import pageToOffsetlimit from '@/utils/page-to-offsetlimit'
import type { IStatistics, IArticle } from '@/service/modules/home.request'
import type { ReduxState } from '..'

// Types
export interface IHomeSliceState {
  statistics: IStatistics | Record<string, never>
  articleList: IArticle[] | []
  articleListPage: number
}

// Thunks
const fetchStatisticsAction = createAsyncThunk('home/fetchStatistics', async () => {
  return await getStatistics()
})
const fetchArticlesAction = createAsyncThunk('home/fetchArticlesAction', async (_, thunkAPI) => {
  const articleListPage = (thunkAPI.getState() as ReduxState).home.articleListPage
  const { offset, limit } = pageToOffsetlimit(articleListPage)
  return await getArticleList(offset, limit)
})

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    statistics: {},
    articleList: [],
    articleListPage: 1
  } as IHomeSliceState,
  reducers: {
    addArticleListPageAction(state) {
      state.articleListPage += 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticsAction.fulfilled, (state, { payload }) => {
        state.statistics = payload ?? {}
      })
      .addCase(fetchArticlesAction.fulfilled, (state, { payload }) => {
        if (state.articleListPage === 1) {
          state.articleList = payload ?? []
        } else {
          state.articleList = [...state.articleList, ...(payload ?? [])]
        }
      })
  }
})

export { fetchStatisticsAction, fetchArticlesAction }
export const { addArticleListPageAction } = homeSlice.actions
