import request from '../index'
import { IArticle } from './home.request'

const MODULE_BASE_URL = '/articles'

async function getArticleById(id: number) {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}/${id}`)
    return res.data as IArticle
  } catch (error) {
    console.error(error)
  }
}

export { getArticleById }
