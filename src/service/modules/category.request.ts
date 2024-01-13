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
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as ICategory
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByCategoryId(categoryId: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${categoryId}/articles`)
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as IArticle[]
  } catch (error) {
    console.error(error)
  }
}

async function getCategoryList() {
  try {
    const res = await request.get(`${MODULE_BASE_URL}`)
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as ICategory[]
  } catch (error) {
    console.error(error)
  }
}

export { getArticlesByCategoryId, getCategoryById, getCategoryList }
