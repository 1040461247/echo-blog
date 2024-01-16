import request from '../index'
import { IArticle } from './home.request'

// Types
export interface ITag {
  id: number
  name: string
  create_time: string
  update_time: string
  article_count: number
}

const MODULE_BASE_URL = '/tags'

async function getTagById(tagId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${tagId}`)
  return res.data as ITag
}

async function getArticlesByTagId(tagId: number) {
  const res = await request.get(`${MODULE_BASE_URL}/${tagId}/articles`)
  return res.data as IArticle[]
}

async function getTagList() {
  const res = await request.get(`${MODULE_BASE_URL}`)
  return res.data as ITag[]
}

export { getArticlesByTagId, getTagById, getTagList }
