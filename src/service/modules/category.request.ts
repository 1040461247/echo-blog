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

const MODULE_BASE_URL = '/categories'

async function getCategoryById(categoryId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${categoryId}`)
  return res.data as ICategory
}

async function getArticlesByCategoryId(categoryId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${categoryId}/articles`)
  return res.data as IArticle[]
}

async function getCategoryList() {
  const res = await request.get(`${MODULE_BASE_URL}`)
  return res.data as ICategory[]
}

export { getArticlesByCategoryId, getCategoryById, getCategoryList }
