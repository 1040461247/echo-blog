import { IComment } from '@/service/modules/article.request'

export default function sortComments(comments: IComment[], curUserId?: number) {
  const commentList = [...comments]

  // const hotSort = commentList.toSorted((a, b) => b.totalLikes - a.totalLikes)
  // 当前登录用户的评论
  const selfComment = commentList
    .filter((item) => item.user.id === curUserId)
    .toSorted((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime))
  // 按时间排序的评论
  const newSort = commentList.toSorted(
    (a, b) => Date.parse(b.createTime) - Date.parse(a.createTime),
  )
  const endSort = Array.from(new Set([...selfComment, ...newSort]))

  return endSort
}
