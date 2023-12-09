import { memo } from 'react'
import Image from 'next/image'
import { IArticle } from '@/service/modules/home.request'
import formatDate from '@/utils/format-date'
import Link from 'next/link'
import type { FC } from 'react'
import { ARTICLE_PATH } from '@/constants'

// Types
export interface IProps {
  children?: React.ReactElement
  articlesData: IArticle[]
}

const Timeline: FC<IProps> = memo(({ articlesData }) => {
  return (
    <div className="timeline-wrap">
      <ul className="timeline">
        {articlesData.map((item, index) => (
          <li key={item.id}>
            <div className={`${index % 2 === 0 ? 'direction-l' : 'direction-r'}`}>
              <div className="flag-wrapper">
                <span className="hexa"></span>
                <span className="time-wrapper">
                  <span className="time">{formatDate(item.create_time)}</span>
                </span>
              </div>

              <Link href={`${ARTICLE_PATH}/${item.id}`} className="desc block rounded-sm border">
                {item.cover_url && (
                  <div className="desc-cover relative h-32">
                    <div className="desc-cover-img relative w-full h-full">
                      <Image
                        className="object-cover"
                        src={item.cover_url}
                        fill
                        sizes="100%"
                        alt="article-cover"
                      />
                      <div className="desc-cover-mask absolute inset-0 bg-black/30"></div>
                    </div>
                    <div className="desc-cover-title absolute inset-x-0 bottom-0 flex w-full px-2 pb-2">
                      <h3 className="ellipsis-1-line px-5 py-3 max-w-full border border-black/10 bg-white/60 backdrop-blur-lg rounded-xl text-[#343a3c] text-2xl text-center">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                )}
                <div className="desc-content p-4 bg-white text-[#333]">
                  {!item.cover_url && <h3 className="text-2xl font-bold">{item.title}</h3>}
                  <span className="ellipsis-4-line">{item.content}</span>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Timeline
Timeline.displayName = 'Timeline'
