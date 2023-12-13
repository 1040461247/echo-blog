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
    const res: any = await request.get(`${MODULE_BASE_URL}/${tagId}`)
    return res.data as ITag
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByTagId(tagId: number) {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}/${tagId}/articles`)
    return res.data as IArticle[]
  } catch (error) {
    console.error(error)
  }
}

async function getTagList() {
  try {
    const res: any = await request.get(`${MODULE_BASE_URL}`)
    return res.data as ITag[]
  } catch (error) {
    console.log(error)
  }
}

export { getArticlesByTagId, getTagById, getTagList }
