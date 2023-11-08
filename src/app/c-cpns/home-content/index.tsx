'use client'

import { memo } from 'react'
import BgTower from '@/components/bg-tower'
import './index.scss'
import useParallax from '@/hooks/parallax'
// Import Types
import type { FC } from 'react'
import type { IOption } from '@/hooks/parallax'

const HomeContent: FC<IProps> = memo(() => {
  const parallax = useParallax()!

  const option: IOption = {
    speed: -2,
    isTransparent: true,
    startShowPct: 0.2
  }

  return (
    <section className="home-content">
      <BgTower />
      <h1 ref={(elRef) => parallax(elRef, option)}>你好啊，我是田若茜</h1>
      <h1 ref={(elRef) => parallax(elRef, option)}>一名软件开发工程师</h1>
      <h1 ref={(elRef) => parallax(elRef, option)}>很高兴认识你^_^</h1>
    </section>
  )
})

export default HomeContent
HomeContent.displayName = 'HomeContent'

// Types
export interface IProps {
  children?: React.ReactElement
}
