import { memo } from 'react'
import Classification from '@/components/classification'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const categoriesPage: FC<IProps> = memo(() => {
  return (
    <div className="categories-page">
      <Classification />
    </div>
  )
})

export default categoriesPage
categoriesPage.displayName = 'categoriesPage'
