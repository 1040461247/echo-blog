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

async function getStatistics() {
  const res = await request.get('/statistics')
  return res.data as IStatistics
}

async function getArticleList(offset = 0, limit = 10) {
  const res = await request.get(`/articles?offset=${offset}&limit=${limit}`)
  return res.data as IArticle[]
}

export { getArticleList, getStatistics }
