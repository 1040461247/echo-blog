import request from '../index'
import { IArticle } from './home.request'
import getAuthHeader from '@/utils/get-auth-header'

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
const COMMENT_BASE_URL = '/articles-comments'

async function getArticleById(id: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${id}`)
  return res.data as IArticle
}

async function getCommentsByArticleId(id: number) {
  const res = await request.get(`${COMMENT_BASE_URL}?article_id=${id}`)
  return res.data as IComment[]
}

async function addCommentToArticle(user_id: number, article_id: number, content: string) {
  const res = await request.post(`${COMMENT_BASE_URL}`, {
    headers: getAuthHeader(),
    body: JSON.stringify({ user_id, article_id, content })
  })
  return res
}

async function addReplyToComment(
  user_id: number,
  article_id: number,
  content: string,
  comment_id: number
) {
  const res = await request.post(`${COMMENT_BASE_URL}/${comment_id}/reply`, {
    headers: getAuthHeader(),
    body: JSON.stringify({ user_id, article_id, content })
  })
  return res
}

async function delComment(commentId: number) {
  const res = await request.delete(`${COMMENT_BASE_URL}/${commentId}`, {
    headers: getAuthHeader()
  })
  return res
}

export {
  getArticleById,
  getCommentsByArticleId,
  addCommentToArticle,
  addReplyToComment,
  delComment
}
