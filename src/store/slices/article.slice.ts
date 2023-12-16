import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getArticleById } from '@/service/modules/article.request'
import { IArticle } from '@/service/modules/home.request'

// Types
export interface IArticleSliceState {
  article: IArticle | Record<string, never>
}

// Thunks
const fetchArticleByIdAction = createAsyncThunk(
  'article/fetchArticleByIdAction',
  async (id: number) => {
    return await getArticleById(id)
  }
)

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {}
  } as IArticleSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleByIdAction.fulfilled, (state, { payload }) => {
      state.article = payload ?? {}
    })
  }
})

export { fetchArticleByIdAction }
