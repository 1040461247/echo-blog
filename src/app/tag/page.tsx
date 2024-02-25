'use client'

import type { IProps as ITagCloudPageProps } from '@/components/tag-cloud-page'
import TagCloudPage from '@/components/tag-cloud-page'
import { TAG_PATH } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchTagListAction } from '@/store/slices'
import { tagsMapTagCloud } from '@/utils/map-data'
import Link from 'next/link'
import type { FC } from 'react'
import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import type { ColorOptions, RendererFunction } from 'react-tagcloud'

// Types
export interface IProps {}

const TagPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTagListAction())
  }, [])

  const { tags } = useAppSelector(
    (state) => ({
      tags: state.tag.tags,
    }),
    shallowEqual,
  )

  const customRenderer: RendererFunction = (tag: any, size, color) => {
    return (
      <Link
        href={`${TAG_PATH}/${tag.key}`}
        key={tag.key}
        style={{ color, fontSize: size, outlineColor: color }}
        className={`tag-${size} group inline-block rounded px-2 m-1 bg-white/5 backdrop-blur-md shadow hover:translate-x-px hover:-translate-y-px hover:outline transition-all duration-200`}
      >
        <span className="opacity-30 group-hover:opacity-90 transition-opacity duration-200">#</span>
        <span className="mx-2">{tag.value}</span>
        <span className="rounded px-1 bg-white/10">{tag.count}</span>
      </Link>
    )
  }

  const tagCloudProps: ITagCloudPageProps = {
    tagCloudOption: {
      minSize: 20,
      maxSize: 38,
      tags: tagsMapTagCloud(tags),
      renderer: customRenderer,
      colorOptions: {
        hue: 'orange',
      } as ColorOptions,
    },
    titleIconName: 'icon-tags',
    titleText: '标签',
    titleColor: 'text-orange-400',
  }

  return (
    <div className="tag-page">
      <TagCloudPage {...tagCloudProps} />
    </div>
  )
})

export default TagPage
TagPage.displayName = 'TagPage'
