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
    if (res.code >= 200 && res.code < 300) {
      return res.data as ITag
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getArticlesByTagId(tagId: number) {
  try {
    const res = await request.get(`${MODULE_BASE_URL}/${tagId}/articles`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as IArticle[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getTagList() {
  try {
    const res = await request.get(`${MODULE_BASE_URL}`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as ITag[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

export { getArticlesByTagId, getTagById, getTagList }
