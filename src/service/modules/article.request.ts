import request from '../index'
import { IArticle } from './home.request'

const MODULE_BASE_URL = '/articles'

async function getArticleById(id: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${id}`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as IArticle
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

export { getArticleById }
