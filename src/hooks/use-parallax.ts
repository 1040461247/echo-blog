// 'use client'

import { useEffect, useState } from 'react'

// Types
export interface IOption {
  speed: number
  isTransparent?: boolean
  startShowPct?: number
  solidPct?: number
  adapter?: {
    [key: string]: TAdapterOption | undefined
    xs?: TAdapterOption
    sm?: TAdapterOption
    md?: TAdapterOption
    lg?: TAdapterOption
    xl?: TAdapterOption
    xxl?: TAdapterOption
  }
}
export type TAdapterOption = Partial<IOption>

export default function useParallax() {
  if (typeof window === 'undefined') return
  const [scrollY, setScrollY] = useState(0)
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function transformSpeedToBase(speed: number) {
    // 将速度值(-10 ~ 10)转化成基数值（-1 ~ 1）
    let base = -speed / 10
    if (speed >= 10) {
      base = -1
    } else if (speed <= -10) {
      base = 1
    }
    return base
  }

  const defaultOption: IOption = {
    speed: -2,
    isTransparent: false,
    startShowPct: 0.2,
    solidPct: 0.5
  }

  function setParallax(elRef: any, option: IOption | TAdapterOption) {
    const { speed, isTransparent, startShowPct, solidPct } = option

    // 根据速度设置偏移量
    if (speed) {
      const base = transformSpeedToBase(speed)
      const offset = scrollY * base
      elRef.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    // 设置透明度
    if (isTransparent && startShowPct) {
      const { top, bottom } = elRef.getBoundingClientRect()
      const enteredViewport = top <= viewportHeight && bottom >= 0

      let opacity = 0
      const elReachTopDistance = 1 - top / viewportHeight
      const isInInterval = elReachTopDistance >= startShowPct && elReachTopDistance <= 1

      if (enteredViewport) {
        if (isInInterval) {
          // 元素在区间内，opacity跟随滚动偏移量增加
          opacity = (elReachTopDistance - startShowPct) / (solidPct! - startShowPct)
        } else if (elReachTopDistance <= startShowPct) {
          opacity = 0
        } else {
          opacity = 1
        }
        // elRef.style.transition = 'opacity 150ms'

        opacity = opacity >= 1 ? 1 : opacity <= 0 ? 0 : opacity

        if (elRef.style.opacity !== opacity) {
          elRef.style.opacity = opacity
        }
      } else if (!enteredViewport && elRef.style.opacity !== 0) {
        // 元素未进入视口前，若opacity!==0，则初始化元素的opacity
        elRef.style.opacity = 0
      }
    }
  }

  return function parallax(elRef: any, option = defaultOption) {
    if (!elRef) return
    if (!option.adapter || Object.keys(option.adapter).length === 0) {
      return setParallax(elRef, option)
    }

    // 响应式断点
    const breakpoints: {
      xs: number
      sm: number
      md: number
      lg: number
      xl: number
      xxl: number
      [key: string]: number
    } = {
      xs: 475,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1537
    }

    const adapters = option.adapter
    for (const breakPoint in adapters) {
      // 当屏幕宽度符合适配断点时，使用各自断点的option
      if (viewportWidth >= breakpoints[breakPoint]) {
        // 当子option中没有选项时使用父选项
        const defaultOption = { ...option }
        const subOption = adapters[breakPoint]!
        const assignOption = Object.assign(defaultOption, subOption)
        return setParallax(elRef, assignOption)
      } else {
        return setParallax(elRef, option)
      }
    }
  }
}
