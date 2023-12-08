import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const ArticleCard: FC<IProps> = memo(() => {
  return (
    <div className="article-card scale-90">
      <div className="card-shadow">
        <img className="w-full" src="/images/articles-display/card_shadow.png" alt="card-shadow" />
      </div>
    </div>
  )
})

export default ArticleCard
ArticleCard.displayName = 'ArticleCard'
