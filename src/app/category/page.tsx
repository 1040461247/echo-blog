'use client'

import { memo, useEffect } from 'react'
import { shallowEqual } from 'react-redux'
import Link from 'next/link'
import { fetchCategoryListAction } from '@/store/slices'
import { CATEGORY_PATH } from '@/constants'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { tagsMapTagCloud } from '@/utils/map-data'
import TagCloudPage from '@/components/tag-cloud-page'
import type { FC } from 'react'
import type { ColorOptions, RendererFunction } from 'react-tagcloud'
import type { IProps as ITagCloudPageProps } from '@/components/tag-cloud-page'

// Types
export interface IProps {
  children?: React.ReactElement
}

const CategoryPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCategoryListAction())
  }, [])

  const { categories } = useAppSelector(
    (state) => ({
      categories: state.category.categories
    }),
    shallowEqual
  )

  const customRenderer: RendererFunction = (tag: any, size, color) => {
    return (
      <Link
        href={`${CATEGORY_PATH}/${tag.key}`}
        key={tag.key}
        style={{ color, fontSize: size, outlineColor: color }}
        className={`tag-${size} group inline-block rounded px-2 m-1 bg-white/5 backdrop-blur-md shadow hover:translate-x-px hover:-translate-y-px hover:outline transition-all duration-200`}
      >
        <span className="mx-2">{tag.value}</span>
        <span className="rounded px-1 bg-white/10">{tag.count}</span>
      </Link>
    )
  }

  const tagCloudProps: ITagCloudPageProps = {
    tagCloudOption: {
      minSize: 28,
      maxSize: 28,
      tags: tagsMapTagCloud(categories),
      renderer: customRenderer,
      colorOptions: {
        hue: 'red'
      } as ColorOptions,
      shuffle: false
    },
    titleIconName: 'icon-category',
    titleText: '分类',
    titleColor: 'text-red-400'
  }

  return (
    <div className="category-page">
      <TagCloudPage {...tagCloudProps} />
    </div>
  )
})

export default CategoryPage
CategoryPage.displayName = 'CategoryPage'
