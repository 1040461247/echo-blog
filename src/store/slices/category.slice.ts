import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getArticlesByCategoryId, getCategoryById } from '@/service/modules/category.request'
import type { IArticle } from '@/service/modules/home.request'
import type { ICategory } from '@/service/modules/category.request'

// Types
export interface IInitialState {
  articles: IArticle[] | []
  category: ICategory | Record<string, never>
}

// Thunks
const fetchArticlesByCategoryIdAction = createAsyncThunk(
  'category/fetchArticlesByCategoryIdAction',
  async (categoryId: number) => {
    return await getArticlesByCategoryId(categoryId)
  }
)
const fetchCategoryByIdAction = createAsyncThunk(
  'category/fetchCategoryByIdAction',
  async (categoryId: number) => {
    return await getCategoryById(categoryId)
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    articles: [],
    category: {}
  } as IInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByCategoryIdAction.fulfilled, (state, { payload }) => {
        state.articles = payload ?? []
      })
      .addCase(fetchCategoryByIdAction.fulfilled, (state, { payload }) => {
        state.category = payload ?? {}
      })
  }
})

export { fetchArticlesByCategoryIdAction, fetchCategoryByIdAction }
