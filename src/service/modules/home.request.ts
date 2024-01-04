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
    const statistics: any = await request.get('/statistics')
    return statistics.data as IStatistics
  } catch (error) {
    console.error(error)
  }
}

async function getArticleList(offset = 0, limit = 10) {
  try {
    const statistics: any = await request.get(`/articles?offset=${offset}&limit=${limit}`)
    return statistics.data as IArticle[]
  } catch (error) {
    console.error(error)
  }
}

export { getStatistics, getArticleList }
