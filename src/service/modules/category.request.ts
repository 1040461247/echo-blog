import request from '../index'
import { IArticle } from './home.request'

// Types
export interface ICategory {
  id: number
  name: string
  create_time: string
  update_time: string
  article_count: number
}

const MODULE_BASE_URL = '/categories'

async function getCategoryById(categoryId: number) {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}/${categoryId}`)
    return res.data as ICategory
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByCategoryId(categoryId: number) {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}/${categoryId}/articles`)
    return res.data as IArticle[]
  } catch (error) {
    console.error(error)
  }
}

async function getCategoryList() {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}`)
    return res.data as ICategory[]
  } catch (error) {
    console.log(error)
  }
}

export { getArticlesByCategoryId, getCategoryById, getCategoryList }
