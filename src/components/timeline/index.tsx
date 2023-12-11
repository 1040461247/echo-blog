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
  function isLeft(index: number) {
    return index % 2 !== 0
  }

  return (
    <div className="timeline-wrap">
      <ul
        className={`timeline relative p-0 w-full mt-5 list-none before:absolute before:z-[5] before:content-[''] before:left-1/2 before:top-0 before:block before:w-[2px] before:h-full before:ml-[-1px] before:[background:linear-gradient(to_bottom,transparent_0%,rgb(213_213_213)_8%,rgb(213_213_213)_92%,transparent_100%)] md:mx-auto md:mt-5`}
      >
        {articlesData.map((item, index) => (
          <li
            className={`py-8 after:content-[''] md:after:block md:after:h-0 md:after:clear-both md:after:invisible`}
            key={item.id}
          >
            <div
              className={`${
                isLeft(index)
                  ? 'direction-l md:float-left md:text-right'
                  : 'direction-r md:float-right md:text-left'
              } float-none w-full text-center md:relative md:w-1/2`}
            >
              <div className="flag-wrapper relative text-center md:inline-block">
                <span
                  className={`hexa absolute inset-x-0 top-[-30px] w-4 h-[10px] mx-auto mt-0 bg-[--primary-color] z-[5] before:content-[''] before:absolute before:top-[-4px] before:inset-x-0 before:h-0 before:border-b-[4px] before:border-solid before:border-b-[--primary-color] before:border-x-[8px] before:border-x-[transparent] after:absolute after:bottom-[-4px] after:inset-x-0 after:h-0 after:border-t-[4px] after:border-solid after:border-t-[--primary-color] after:border-x-[8px] after:border-x-[transparent] md:-left-2 md:right-auto md:top-2 ${
                    isLeft(index) ? 'md:left-auto md:mr-0 md:!-right-2' : ''
                  } `}
                ></span>
                <span
                  className={`time-wrapper block relative mt-1 z-[14] leading-4 align-middle text-white md:inline md:align-middle md:m-0 ${
                    isLeft(index) ? 'md:float-left md:mr-4' : 'md:float-right md:ml-4'
                  }`}
                >
                  <span className="time inline-block p-2 bg-[--primary-color] rounded-sm md:py-[5px] md:px-[10px]">
                    {formatDate(item.create_time)}
                  </span>
                </span>
              </div>

              <Link
                href={`${ARTICLE_PATH}/${item.id}`}
                className={`desc relative z-[15] m-4 mb-0 shadow-md block rounded-sm border ${
                  isLeft(index) ? '' : 'md:mt-4 md:mb-3'
                }`}
              >
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
