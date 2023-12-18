import { memo } from 'react'
import MDEditor from '@uiw/react-md-editor'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  articleContent: string
}

const ArticleContent: FC<IProps> = memo(({ articleContent }) => {
  return (
    <div className="article-content mt-9">
      <MDEditor.Markdown source={articleContent} />
    </div>
  )
})

export default ArticleContent
ArticleContent.displayName = 'ArticleContent'
