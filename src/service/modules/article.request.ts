import request from '../index'
import { IArticle } from './home.request'

// Types
export interface IComment {
  id: number
  content: string
  comment_id: number | null
  create_time: string
  update_time: string
  user: {
    id: number
    name: string
    avatar_url: string
    ip_address: string
    browser_info: string
    os_info: string
  }
}

const MODULE_BASE_URL = '/articles'

async function getArticleById(id: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${id}`)
  return res.data as IArticle
}

async function getCommentsByArticleId(id: number) {
  const res = await request.get(`/articles-comments?article_id=${id}`)
  return res.data as IComment[]
}

export { getArticleById, getCommentsByArticleId }
