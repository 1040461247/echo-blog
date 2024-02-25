'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { fetchTotalPvAction, fetchUvAction } from '@/store/slices'
import { memo, useEffect } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FooterPageviews: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUvAction())
    dispatch(fetchTotalPvAction())
  }, [])

  const { uv, pv } = useAppSelector(
    (state) => ({
      uv: state.global.uv,
      pv: state.global.pv,
    }),
    shallowEqual,
  )

  return (
    <div className="footer-pageviews flex lg:flex-col gap-3 lg:gap-1 items-end">
      <div>访问者数量 {uv}</div>
      <div>页面总浏览量 {pv}</div>
    </div>
  )
})

export default FooterPageviews
FooterPageviews.displayName = 'FooterPageviews'
