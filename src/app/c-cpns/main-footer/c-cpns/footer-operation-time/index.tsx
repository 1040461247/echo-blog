'use client'

import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import Odometor from '@/components/odometor'
import { formatDiff } from '@/utils/format-date'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FooterOperationTime: FC<IProps> = memo(() => {
  const [operationTime, setOperationTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    remainingSeconds: 0
  })

  useEffect(() => {
    const startTime = new Date('2024-02-04T08:00:00')

    function updateOperationTime() {
      const curTime = new Date()
      const diffSeconds = Math.floor((curTime.getTime() - startTime.getTime()) / 1000)
      const diffTime = formatDiff(diffSeconds)
      setOperationTime(diffTime)
    }

    const timer = setInterval(updateOperationTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="operation-time flex items-center">
      <span>博客已运营</span>
      <Odometor num={operationTime?.days ?? 0} />
      <span>天</span>
      <Odometor num={operationTime?.hours ?? 0} />
      <span>小时</span>
      <Odometor num={operationTime?.minutes ?? 0} />
      <span>分钟</span>
      <Odometor num={operationTime?.remainingSeconds ?? 0} />
      <span>秒</span>
    </div>
  )
})

export default FooterOperationTime
FooterOperationTime.displayName = 'FooterOperationTime'
