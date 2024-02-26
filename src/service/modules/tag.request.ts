import { AM_ARTICLES, AM_TAGS } from '@/constants'
import request from '../index'
import { IArticle } from './home.request'

// Types
export interface ITag {
  id: number
  name: string
  createTime: string
  updateTime: string
  articleCount: number
}

// Services
async function getTagById(tagId: number) {
  const res = await request.get(`${AM_TAGS}/${tagId}`)
  return res.data as ITag
}

async function getArticlesByTagId(tagId: number) {
  const res = await request.get(`${AM_ARTICLES}/tag/${tagId}`)
  return res.data as IArticle[]
}

async function getTagList() {
  const res = await request.get(`${AM_TAGS}`)
  return res.data as ITag[]
}

export { getArticlesByTagId, getTagById, getTagList }
