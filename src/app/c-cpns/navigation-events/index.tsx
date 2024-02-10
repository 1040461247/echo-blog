'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { recordPageview } from '@/service/modules/global.request'

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prePathRef = useRef('')

  useEffect(() => {
    // pv数据埋点
    const url = searchParams.size === 0 ? pathname : `${pathname}?${searchParams}`
    if (prePathRef.current === url) return
    prePathRef.current = url
    recordPageview(url)
  }, [pathname, searchParams])

  return null
}
