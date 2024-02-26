'use client'

import ComponentLoading from '@/components/component-loading'
import { ARCHIVES_PATH, CATEGORY_PATH, TAG_PATH } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchStatisticsAction } from '@/store/slices'
import dynamic from 'next/dynamic'
import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { type IProps as IItemProps } from '../blog-info-statistics-item'

const BlogInfoStatisticsItem = dynamic(() => import('../blog-info-statistics-item'), {
  loading: () => <ComponentLoading />,
})

// Types
export interface IProps {
  children?: React.ReactElement
  handleClouseDrawer?: () => void
}

const BlogInfoStatistics: FC<IProps> = memo(({ handleClouseDrawer }) => {
  const { statistics } = useAppSelector(
    (state) => ({
      statistics: state.home.statistics,
    }),
    shallowEqual,
  )

  const [itemList, setItemList] = useState<IItemProps[] | []>([])

  useEffect(() => {
    if (statistics) {
      setItemList([
        {
          text: '文章',
          linkHref: ARCHIVES_PATH,
          count: statistics.articlesCount,
        },
        {
          text: '分类',
          linkHref: CATEGORY_PATH,
          count: statistics.categoriesCount,
        },
        {
          text: '标签',
          linkHref: TAG_PATH,
          count: statistics.tagsCount,
        },
      ])
    }
  }, [statistics])

  return (
    <nav className="blog-info-statistics flex items-center h-12 my-[10px] text-center">
      {statistics &&
        itemList.map((item) => (
          <BlogInfoStatisticsItem
            {...item}
            handleClouseDrawer={handleClouseDrawer}
            key={item.text}
          />
        ))}
    </nav>
  )
})

export default BlogInfoStatistics
BlogInfoStatistics.displayName = 'BlogInfoStatistics'
