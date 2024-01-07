import request from '../index'

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
  cover_url: string
  create_time: string
  update_time: string
  is_sticky: boolean
  author: {
    id: number
    name: string
    avatar_url: string
  }
  category: {
    id: number
    name: string
  }
  tags: { id: number; name: string }[] | null
}

async function getStatistics() {
  try {
    const res = await request.get('/statistics')
    if (res.code >= 200 && res.code < 300) {
      return res.data as IStatistics[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

async function getArticleList(offset = 0, limit = 10) {
  try {
    const res = await request.get(`/articles?offset=${offset}&limit=${limit}`)
    if (res.code >= 200 && res.code < 300) {
      return res.data as IArticle[]
    } else {
      console.error(res)
    }
  } catch (error) {
    console.error(error)
  }
}

export { getArticleList, getStatistics }
