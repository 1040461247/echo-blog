import { IComment } from '@/service/modules/article.request'

export default function sortComments(comments: IComment[]) {
  const commentList = [...comments]

  // 按热度排序
  const hotSort = commentList.toSorted((a, b) => b.totalLikes - a.totalLikes)
  // 按最新时间排序
  const newSort = commentList.toSorted(
    (a, b) => Date.parse(b.create_time) - Date.parse(a.create_time)
  )
  const endSort = Array.from(new Set([...hotSort, ...newSort]))

  return endSort
}
