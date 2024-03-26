import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStatistics, getArticleList, getBlogAuthorInfo } from '@/service/modules/home.request'
import pageToOffsetlimit from '@/utils/page-to-offsetlimit'
import type { IStatistics, IArticle } from '@/service/modules/home.request'
import type { ReduxState } from '..'
import { IUserInfo } from '@/service/modules/user.request'

// Types
export interface IHomeSliceState {
  statistics: IStatistics | null
  articleList: IArticle[] | []
  articleListPage: number
  articleLimit: number
  blogAuthorInfo: IUserInfo | null
}

// Thunks
const fetchStatisticsAction = createAsyncThunk('home/fetchStatisticsAction', async () => {
  return await getStatistics()
})

const fetchArticlesAction = createAsyncThunk('home/fetchArticlesAction', async (_, thunkAPI) => {
  const { articleListPage, articleLimit } = (thunkAPI.getState() as ReduxState).home
  const { offset, limit } = pageToOffsetlimit(articleListPage, articleLimit)
  return await getArticleList(offset, limit)
})

const fetchBlogAuthorInfoAction = createAsyncThunk('home/fetchBlogAuthorInfoAction', async () => {
  return await getBlogAuthorInfo()
})

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    statistics: null,
    articleList: [],
    articleListPage: 1,
    articleLimit: 10,
    blogAuthorInfo: null,
  } as IHomeSliceState,
  reducers: {
    addArticleListPageAction(state) {
      const curAtcLength = state.articleList.length // 当前文章列表已有长度
      const atcLength = state.articleListPage * state.articleLimit // 当前应该展示的文章列表长度
      console.log(curAtcLength, atcLength)
      if (curAtcLength === atcLength) {
        state.articleListPage += 1
        console.log(state.articleListPage)
      }
    },
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
      .addCase(fetchBlogAuthorInfoAction.fulfilled, (state, { payload }) => {
        state.blogAuthorInfo = payload ?? null
      })
  },
})

export { fetchStatisticsAction, fetchArticlesAction, fetchBlogAuthorInfoAction }
export const { addArticleListPageAction } = homeSlice.actions
