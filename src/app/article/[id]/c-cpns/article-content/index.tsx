'use client'

import { memo } from 'react'
import MDEditor from '@uiw/react-md-editor'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  articleContent: string
  articleDescription: string
}

const ArticleContent: FC<IProps> = memo(({ articleContent = '', articleDescription = '' }) => {
  return (
    <div className="article-content mt-9">
      <div className="article-content-description mb-3">
        <p>{articleDescription}</p>
      </div>
      <MDEditor.Markdown
        className="!bg-transparent !text-inherit"
        source={articleContent}
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <div className="article-content-btline w-[120%] h-[0.5px] -mx-8 my-8 bg-white/10"></div>
    </div>
  )
})

export default ArticleContent
ArticleContent.displayName = 'ArticleContent'
