import { memo } from 'react'
import ArticleCard from './c-cpns/article-card'
import type { FC } from 'react'
import type { IArticle } from '@/service/modules/home.request'

// Types
export interface IProps {
  children?: React.ReactElement
  titleIcon: (className?: string) => React.ReactElement
  titleText: string
  articlesData: IArticle[]
}

const ArticlesDisplay: FC<IProps> = memo(({ titleIcon, titleText, articlesData }) => {
  // Common Styles
  const wordArtStyle = `
    !text-4xl sm:!text-5xl md:!text-6xl !text-[#d3d7eb] !tracking-[5px] !font-black
    [text-shadow:-2px_-2px_0_var(--primary-color),2px_-2px_0_var(--primary-color),-2px_2px_0_var(--primary-color),2px_2px_0_var(--primary-color),-4px_-4px_0_black,4px_-4px_0_black,-4px_4px_0_black,4px_4px_0_black,10px_10px_0_rgb(0_0_0_/_0.5)]
  `

  return (
    <div className="articles-display min-h-[--min-height] pt-[--header-fheight-ssm] sm:pt-[--header-fheight-sm] md:pt-[--header-fheight-md] bg-desk bg-no-repeat bg-center bg-cover [background-attachment:fixed]">
      <div className="articles-display-inner">
        {/* Header */}
        <header className={`title flex justify-center w-full pt-4 text-left ${wordArtStyle}`}>
          <div className="title-icon">{titleIcon(wordArtStyle)}</div>
          <h2 className="title-text">{titleText}</h2>
        </header>

        {/* Articles */}
        <main className="articles sm:mt-6 md:mt-8">
          <nav className="flex flex-wrap justify-center">
            {articlesData.map((item) => (
              <div className="card-wrap w-[280px] sm:w-[240px]" key={item.id}>
                <ArticleCard articleData={item} />
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
