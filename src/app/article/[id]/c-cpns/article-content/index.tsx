'use client'

import { memo } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import '@/assets/style/md-reset.css'
import type { FC } from 'react'
import uuid from '@/utils/uuid'
import { useAppDispatch } from '@/hooks/use-store'
import { pushTitleIdsAction } from '@/store/slices'

// Types
export interface IProps {
  children?: React.ReactElement
  articleContent: string
  articleDescription: string
  customStyle?: string
}

const ArticleContent: FC<IProps> = memo(
  ({ articleContent = '', articleDescription = '', customStyle }) => {
    const dispatch = useAppDispatch()

    return (
      <div className={`article-content mt-9 ${customStyle}`}>
        <div className="article-content-description mb-3">
          <p className="indent-[2em] leading-6">{articleDescription}</p>
        </div>

        <MarkdownPreview
          className="mt-10"
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
