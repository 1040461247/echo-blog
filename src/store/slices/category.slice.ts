import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArticlesByCategoryId,
  getCategoryById,
  getCategoryList
} from '@/service/modules/category.request'
import type { IArticle } from '@/service/modules/home.request'
import type { ICategory } from '@/service/modules/category.request'

// Types
export interface ICategorySliceState {
  articles: IArticle[] | []
  category: ICategory | Record<string, never>
  categories: ICategory[] | []
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
const fetchCategoryListAction = createAsyncThunk('category/fetchCategoryListAction', async () => {
  return await getCategoryList()
})

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    articles: [],
    category: {},
    categories: []
  } as ICategorySliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesByCategoryIdAction.fulfilled, (state, { payload }) => {
        state.articles = payload ?? []
      })
      .addCase(fetchCategoryByIdAction.fulfilled, (state, { payload }) => {
        state.category = payload ?? {}
      })
      .addCase(fetchCategoryListAction.fulfilled, (state, { payload }) => {
        state.categories = payload ?? []
      })
  }
})

export { fetchArticlesByCategoryIdAction, fetchCategoryByIdAction, fetchCategoryListAction }
