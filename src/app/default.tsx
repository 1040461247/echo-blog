'use client'

import { LOGIN_PATH, SIGNUP_PATH } from '@/constants'
import { notFound, usePathname } from 'next/navigation'
import { memo, useEffect } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {}

const RootDefault: FC<IProps> = memo(() => {
  const pathname = usePathname()
  const slotSegment = [LOGIN_PATH, SIGNUP_PATH]

  // 处理default覆盖not-found界面
  useEffect(() => {
    if (!slotSegment.includes(pathname)) {
      notFound()
    }
  }, [])

  return null
})

export default RootDefault
RootDefault.displayName = 'RootDefault'
