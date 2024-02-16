import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStatistics, getArticleList } from '@/service/modules/home.request'
import pageToOffsetlimit from '@/utils/page-to-offsetlimit'
import type { IStatistics, IArticle } from '@/service/modules/home.request'
import type { ReduxState } from '..'

// Types
export interface IHomeSliceState {
  statistics: IStatistics | null
  articleList: IArticle[] | []
  articleListPage: number
  articleLimit: number
}

// Thunks
const fetchStatisticsAction = createAsyncThunk('home/fetchStatistics', async () => {
  return await getStatistics()
})
const fetchArticlesAction = createAsyncThunk('home/fetchArticlesAction', async (_, thunkAPI) => {
  const { articleListPage, articleLimit } = (thunkAPI.getState() as ReduxState).home
  const { offset, limit } = pageToOffsetlimit(articleListPage, articleLimit)
  return await getArticleList(offset, limit)
})

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    statistics: null,
    articleList: [],
    articleListPage: 1,
    articleLimit: 10
  } as IHomeSliceState,
  reducers: {
    addArticleListPageAction(state) {
      const curAtcLength = state.articleList.length
      const atcLength = state.articleListPage * state.articleLimit
      if (curAtcLength === atcLength) {
        state.articleListPage += 1
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticsAction.fulfilled, (state, { payload }) => {
        state.statistics = payload ?? null
      })
      .addCase(fetchArticlesAction.fulfilled, (state, { payload }) => {
        const headItemId = payload && payload[0]?.id
        if (!state.articleList.find((item) => item.id === headItemId)) {
          state.articleList = [...state.articleList, ...(payload ?? [])]
        }
      })
  }
})

export { fetchStatisticsAction, fetchArticlesAction }
export const { addArticleListPageAction } = homeSlice.actions
