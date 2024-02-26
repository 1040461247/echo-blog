import { AM_ARTICLES, AM_CATEGORIES } from '@/constants'
import request from '../index'
import { IArticle } from './home.request'

// Types
export interface ICategory {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

// Services
async function getCategoryById(categoryId: number) {
  const res = await request.get(`${AM_CATEGORIES}/${categoryId}`)
  return res.data as ICategory
}

async function getArticlesByCategoryId(categoryId: number) {
  const res = await request.get(`${AM_ARTICLES}/category/${categoryId}`)
  return res.data as IArticle[]
}

async function getCategoryList() {
  const res = await request.get(`${AM_CATEGORIES}`)
  return res.data as ICategory[]
}

export { getArticlesByCategoryId, getCategoryById, getCategoryList }
