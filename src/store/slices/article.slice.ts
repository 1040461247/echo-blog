import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IComment, getArticleById, getCommentsByArticleId } from '@/service/modules/article.request'
import { IArticle } from '@/service/modules/home.request'
import sortComments from '@/utils/sort-comments'
import { comment } from '@uiw/react-md-editor'

// Types
export interface IArticleSliceState {
  article: IArticle | Record<string, never>
  articleComments: IComment[] | []
}

// Thunks
const fetchArticleByIdAction = createAsyncThunk(
  'article/fetchArticleByIdAction',
  async (id: number) => {
    return await getArticleById(id)
  }
)
const fetchCommentsByArticleIdAction = createAsyncThunk(
  'article/fetchCommentsByArticleIdAction',
  async (id: number) => {
    return await getCommentsByArticleId(id)
  }
)

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {},
    articleComments: []
  } as IArticleSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleByIdAction.fulfilled, (state, { payload }) => {
        state.article = payload ?? {}
      })
      .addCase(fetchCommentsByArticleIdAction.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.articleComments = payload ?? []
      })
  }
})

export { fetchArticleByIdAction, fetchCommentsByArticleIdAction }
