'use client'

import { memo } from 'react'
import MDEditor from '@uiw/react-md-editor'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  articleContent: string
  articleDescription: string
  customStyle?: string
}

const ArticleContent: FC<IProps> = memo(
  ({ articleContent = '', articleDescription = '', customStyle }) => {
    return (
      <div className={`article-content mt-9 ${customStyle}`}>
        <div className="article-content-description mb-3">
          <p>{articleDescription}</p>
        </div>

        <MDEditor.Markdown
          className="!bg-transparent !text-inherit"
          source={articleContent}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
    )
  }
)

export default ArticleContent
ArticleContent.displayName = 'ArticleContent'
