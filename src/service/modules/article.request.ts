import request from '../index'
import { IArticle } from './home.request'

const MODULE_BASE_URL = '/articles'

async function getArticleById(id: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${id}`)
    if (!res.ok) return console.error(res)

    const jsonData = await res.json()
    return jsonData.data as IArticle
  } catch (error) {
    console.error(error)
  }
}

export { getArticleById }
