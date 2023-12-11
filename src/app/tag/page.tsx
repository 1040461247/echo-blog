import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const TagsPage: FC<IProps> = memo(() => {
  return <div className="tags-page">hello TagsPage</div>
})

export default TagsPage
TagsPage.displayName = 'TagsPage'
