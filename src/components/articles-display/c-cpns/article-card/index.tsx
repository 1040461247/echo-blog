import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IArticle } from '@/service/modules/home.request'
import formatDate from '@/utils/format-date'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  articleData: IArticle
}

const ArticleCard: FC<IProps> = memo(({ articleData }) => {
  const duration = 'duration-500'

  function rotateCard(el: HTMLDivElement | null) {
    // 随机旋转card
    if (!el) return

    const random = Math.random() * 10
    const symbol = Math.random() > 0.5 ? random : -random
    const randomDeg = Math.round(symbol) + 'deg'

    const scale = 'scale(0.75)'
    const rotate = `rotate(${randomDeg})`

    el.style.transform = `${scale} ${rotate}`
  }

  return (
    <div
      className={`article-card group relative transition-transform ${duration} hover:!rotate-0`}
      ref={(el) => rotateCard(el)}
    >
      {/* Card Shadow */}
      <div
        className={`card-shadow relative left-5 top-5 transition-transform ${duration} group-hover:translate-x-10 group-hover:translate-y-20`}
      >
        <img className="w-full" src="/images/articles-display/card_shadow.png" alt="card-shadow" />
      </div>

      {/* Card */}
      <Link
        href={`/article/${articleData.id}`}
        className={`card block absolute inset-0 px-[11.8%] pt-[16.5%] bg-cover bg-center ${
          articleData.is_sticky ? 'bg-card-red' : 'bg-card-gray'
        }`}
      >
        {/* Card Cover */}
        <div className="card-cover relative h-[48%] rounded-sm overflow-hidden">
          {articleData.cover_url && (
            <Image
              className="object-cover"
              src={articleData.cover_url}
              fill
              sizes="100%"
              alt="card-cover"
            />
          )}
        </div>

        {/* Card Content */}
        <div className="card-content">
          <div className="title ellipsis-1-line pt-3 text-2xl sm:text-xl text-[#2f3035]">
            {articleData.title}
          </div>
          <div className="desc ellipsis-1-line text-xl sm:text-lg text-[#4e4e56]">
            {articleData.content}
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer flex justify-between gap-5 mt-14 sm:mt-8 text-lg sm:text-base text-black/30">
          <div className="card-footer-left flex-1 text-center">{articleData.category.name}</div>
          <div className="card-footer-right flex-1 text-center">
            {formatDate(articleData.create_time, 'YYYY-MM')}
          </div>
        </div>
      </Link>
    </div>
  )
})

export default ArticleCard
ArticleCard.displayName = 'ArticleCard'
