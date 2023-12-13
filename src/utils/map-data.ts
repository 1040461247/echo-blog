import type { ICategory } from '@/service/modules/category.request'
import type { ITag } from '@/service/modules/tag.request'
import type { Tag } from 'react-tagcloud'

export const tagsMapTagCloud = (tags: ITag[] | ICategory[]): Tag[] => {
  return tags.map((item) => {
    return {
      value: item.name,
      count: item.article_count,
      key: String(item.id)
    }
  })
}
