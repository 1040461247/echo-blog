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
    const res = await request.get(`${MODULE_BASE_URL}/${categoryId}`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as ICategory
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByCategoryId(categoryId: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${categoryId}/articles`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as IArticle[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getCategoryList() {
  try {
    const res = await request.get(`${MODULE_BASE_URL}`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as ICategory[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

export { getArticlesByCategoryId, getCategoryById, getCategoryList }
