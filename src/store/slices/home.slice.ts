import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStatistics, getArticleList } from '@/service/modules/home.request'
import pageToOffsetlimit from '@/utils/page-to-offsetlimit'
import type { IStatistics, IArticle } from '@/service/modules/home.request'
import type { ReduxState } from '..'

// Types
interface IInitialState {
  statistics: IStatistics | Record<string, never>
  articleList: IArticle[] | []
  articleListPage: number
}

const fetchStatisticsAction = createAsyncThunk('home/fetchStatistics', async () => {
  const statistics = await getStatistics()
  return statistics
})
const fetchArticlesAction = createAsyncThunk('home/fetchArticlesAction', async (_, thunkAPI) => {
  const articleListPage = (thunkAPI.getState() as ReduxState).home.articleListPage
  const { offset, limit } = pageToOffsetlimit(articleListPage)
  const statistics = await getArticleList(offset, limit)
  return statistics
})

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    statistics: {},
    articleList: [],
    articleListPage: 1
  } as IInitialState,
  reducers: {
    articleListPageAction(state, { payload }) {
      state.articleListPage = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticsAction.fulfilled, (state, { payload }) => {
        state.statistics = payload
      })
      .addCase(fetchArticlesAction.fulfilled, (state, { payload }) => {
        state.articleList = payload
      })
  }
})

export { fetchStatisticsAction, fetchArticlesAction }
export const { articleListPageAction } = homeSlice.actions
