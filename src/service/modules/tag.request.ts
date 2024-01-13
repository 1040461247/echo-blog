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
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${tagId}`)
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as ITag
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByTagId(tagId: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${tagId}/articles`)
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as IArticle[]
  } catch (error) {
    console.error(error)
  }
}

async function getTagList() {
  try {
    const res = await request.get(`${MODULE_BASE_URL}`)
    if (!res.ok) return console.error(res)
    const jsonData = await res.json()
    return jsonData.data as ITag[]
  } catch (error) {
    console.error(error)
  }
}

export { getArticlesByTagId, getTagById, getTagList }
