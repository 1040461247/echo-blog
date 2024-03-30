'use client'

import { memo } from 'react'
import { TagCloud } from 'react-tagcloud'
import type { FC } from 'react'
import type { TagCloudProps } from 'react-tagcloud'

// Types
export interface IProps {
  children?: React.ReactElement
  tagCloudOption: TagCloudProps
  titleIconName: string
  titleText: string
  titleColor: string
}

const TagCloudPage: FC<IProps> = memo((props) => {
  const { titleIconName, titleText, titleColor, tagCloudOption } = props

  return (
    <div className="tag-cloud sm:absolute sm:inset-0 sm:pt-[--header-fheight-sm] md:pt-[--header-fheight-md] sm:pb-[--footer-height] lg:pb-[--footer-height-lg] bg-room bg-no-repeat bg-center bg-cover">
      <div className="inner-layout my-auto mx-0 w-full sm:mx-auto sm:w-11/12">
        <div className="tags-main c-card sm:overflow-y-auto sm:simple-scrollbar rounded-none sm:rounded-[18px] w-full sm:w-2/3 lg:w-1/2 sm:my-5 bg-black/30">
          <header className={`tags-title py-4 text-4xl ${titleColor}`}>
            <h2 className="text-center">
              <i className={`iconfont ${titleIconName} !text-4xl`} />
              <span className="mx-1">{titleText}</span>
            </h2>
          </header>

          <main className="tags-content pb-5 text-center">
            <TagCloud {...(tagCloudOption as any)} />
          </main>
        </div>
      </div>
    </div>
  )
})

export default TagCloudPage
TagCloudPage.displayName = 'TagCloudPage'
