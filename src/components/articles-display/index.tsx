import { memo } from 'react'
import ArticleCard from './c-cpns/article-card'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  titleIcon: (className?: string) => React.ReactElement
  titleText: string
}

const ArticlesDisplay: FC<IProps> = memo(({ titleIcon, titleText }) => {
  const cardList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  return (
    <div className="articles-display overflow-y-scroll h-[--ssm-full-height] sm:h-[--sm-full-height] md:h-[--md-full-height] bg-desk bg-no-repeat bg-center bg-cover">
      <div className="inner-layout justify-start flex-col">
        <header className="title flex justify-center w-full pt-[40px] md:pt-[70px] art-font-v1 text-left">
          <div className="title-icon">{titleIcon('art-font-v1')}</div>
          <h2 className="title-text">{titleText}</h2>
        </header>

        <main className="articles mt-4 sm:mt-6 md:mt-8">
          <nav className="flex flex-wrap justify-center">
            {cardList.map((item) => (
              <div className="card-wrap" key={item}>
                <ArticleCard />
              </div>
            ))}
          </nav>
        </main>
      </div>
    </div>
  )
})

export default ArticlesDisplay
ArticlesDisplay.displayName = 'ArticlesDisplay'
