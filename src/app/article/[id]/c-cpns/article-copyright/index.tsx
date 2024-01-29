import formatDate from '@/utils/format-date'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  customStyle?: string
  title: string
  author: string
  createTime: string
  updateTime: string
}

const ArticleCopyright: FC<IProps> = memo(
  ({ customStyle, title, author, createTime, updateTime }) => {
    const copyRightList = [
      {
        title: '标题',
        content: title
      },
      {
        title: '作者',
        content: author
      },
      {
        title: '创建时间',
        content: formatDate(createTime, 'YYYY-MM-DD hh:mm')
      },
      {
        title: '修改时间',
        content: formatDate(updateTime, 'YYYY-MM-DD hh:mm')
      }
    ]

    return (
      <div className={`article-copyright ${customStyle}`}>
        <ul className="px-4 py-[10px] border border-gray-600/40 hover:border-gray-600 rounded-xl transition-colors duration-300 bg-gray-500/5">
          {copyRightList.map((item) => (
            <li className="mb-1 ellipsis-1-line" key={item.title}>
              <span className="text-lg">{item.title}：</span>
              <span>{item.content}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default ArticleCopyright
ArticleCopyright.displayName = 'ArticleCopyright'
