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
  const tagCloudOption: any = props.tagCloudOption
  const { titleIconName, titleText, titleColor } = props

  return (
    <div className="tag-cloud overflow-y-scroll h-[--ssm-full-height] sm:h-[--sm-full-height] md:h-[--md-full-height] py-7 md:py-[10vh] xl:py-[15vh] bg-room bg-no-repeat bg-center bg-cover">
      <div className="inner-layout h-auto">
        <div className="tags-main w-full md:w-2/3 lg:w-1/2 lg:ml-[6vw] inline-block">
          <div
            className={`tags-title mb-5 text-3xl pl-5 pt-2 text-center md:text-left ${titleColor}`}
          >
            <h2>
              <i className={`iconfont ${titleIconName} !text-3xl`} />
              <span className="mx-1">{titleText}</span>
            </h2>
          </div>

          <div className={`tags-content text-center`}>
            <TagCloud {...tagCloudOption} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default TagCloudPage
TagCloudPage.displayName = 'TagCloudPage'
