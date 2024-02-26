import { AM_ARTICLES, AM_STATISTICS, AM_USERS } from '@/constants'
import request from '../index'
import { IUserInfo } from './user.request'

// Types
export interface IStatistics {
  tagsCount: number
  categoriesCount: number
  articlesCount: number
}

export interface IArticle {
  id: number
  title: string
  content?: string
  description: string
  coverUrl: string
  createTime: string
  updateTime: string
  isSticky: boolean
  author: {
    id: number
    name: string
    avatarUrl: string
  }
  category: {
    id: number
    name: string
  }
  tags: { id: number; name: string }[] | null
}

// Services
async function getStatistics() {
  const res = await request.get(AM_STATISTICS)
  return res.data as IStatistics
}

async function getArticleList(offset = 0, limit = 10) {
  const res = await request.get(`${AM_ARTICLES}?offset=${offset}&limit=${limit}`)
  return res.data as IArticle[]
}

async function getBlogAuthorInfo() {
  const res = await request.get(`${AM_USERS}/1`)
  return res.data as IUserInfo
}

export { getArticleList, getStatistics, getBlogAuthorInfo }
