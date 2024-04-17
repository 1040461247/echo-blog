'use client'

import { memo } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import '@/assets/style/md-reset.css'
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

        <MarkdownPreview
          // className="!bg-transparent"
          wrapperElement={{
            'data-color-mode': 'dark',
          }}
          source={articleContent}
        />
      </div>
    )
  },
)

export default ArticleContent
ArticleContent.displayName = 'ArticleContent'
