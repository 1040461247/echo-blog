import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getArticlesByTagId, getTagById } from '@/service/modules/tag.request'
import type { IArticle } from '@/service/modules/home.request'
import type { ITag } from '@/service/modules/tag.request'

// Types
export interface ITagSliceState {
  articles: IArticle[] | []
  tag: ITag | Record<string, never>
}

// Thunks
const fetchArticlesByTagIdAction = createAsyncThunk(
  'tag/fetchArticlesByTagIdAction',
  async (tagId: number) => {
    return await getArticlesByTagId(tagId)
  }
)
const fetchTagByIdAction = createAsyncThunk('tag/fetchTagByIdAction', async (tagId: number) => {
  return await getTagById(tagId)
})

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    articles: [],
    tag: {}
  } as ITagSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByTagIdAction.fulfilled, (state, { payload }) => {
        state.articles = payload ?? []
      })
      .addCase(fetchTagByIdAction.fulfilled, (state, { payload }) => {
        state.tag = payload ?? {}
      })
  }
})

export { fetchArticlesByTagIdAction, fetchTagByIdAction }
