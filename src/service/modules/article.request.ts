import request from '../index'
import { IArticle } from './home.request'
import getAuthHeader from '@/utils/get-auth-header'

// Types
export interface IComment {
  id: number
  content: string
  commentId: number | null
  createTime: string
  updateTime: string
  totalLikes: number
  user: {
    id: number
    name: string
    avatarUrl: string
    ipAddress: string
    browserInfo: string
    osInfo: string
  }
}
export type TCommentLikes = number[]

const MODULE_BASE_URL = '/articles'
const COMMENT_BASE_URL = '/articles-comments'

async function getArticleById(id: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${id}`)
  return res.data as IArticle
}

async function getCommentsByArticleId(id: number) {
  const res = await request.get(`${COMMENT_BASE_URL}?articleId=${id}`)
  return res.data as IComment[]
}

async function getCommentLikesById(userId: number) {
  const res = await request.get(`${COMMENT_BASE_URL}/${userId}/likes`)
  return res.data as TCommentLikes
}

async function addCommentToArticle(userId: number, articleId: number, content: string) {
  const res = await request.post(`${COMMENT_BASE_URL}`, {
    headers: getAuthHeader(),
    body: JSON.stringify({ userId, articleId, content }),
  })
  return res
}

async function addLikes(commentId: number) {
  const res = await request.post(`${COMMENT_BASE_URL}/likes`, {
    headers: getAuthHeader(),
    body: JSON.stringify({ commentId }),
  })
  return res
}

async function addReplyToComment(
  userId: number,
  articleId: number,
  content: string,
  commentId: number,
) {
  const res = await request.post(`${COMMENT_BASE_URL}/${commentId}/reply`, {
    headers: getAuthHeader(),
    body: JSON.stringify({ userId, articleId, content }),
  })
  return res
}

async function remComment(commentId: number) {
  const res = await request.delete(`${COMMENT_BASE_URL}/${commentId}`, {
    headers: getAuthHeader(),
  })
  return res
}

async function remLikes(commentId: number) {
  const res = await request.delete(`${COMMENT_BASE_URL}/likes/${commentId}`, {
    headers: getAuthHeader(),
  })
  return res
}

export {
  getArticleById,
  getCommentsByArticleId,
  getCommentLikesById,
  addCommentToArticle,
  addReplyToComment,
  addLikes,
  remComment,
  remLikes,
}
