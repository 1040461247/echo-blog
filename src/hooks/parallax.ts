import { useEffect, useState } from 'react'

export default function useParallax() {
  if (typeof window === 'undefined') return

  const [scrollY, setScrollY] = useState(0)
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight

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
    let base = -speed / 10
    if (speed >= 10) {
      base = -1
    } else if (speed <= -10) {
      base = 1
    }

    return base
  }

  return function parallax(
    elRef: any,
    { speed = -2, isTransparent = false, startShowPct = 0.2, solidPct = 0.5 } = {}
  ) {
    if (!elRef) return

    // 根据速度设置偏移量
    const base = transformSpeedToBase(speed)
    const offset = scrollY * base
    elRef.style.transform = `translate3d(0, ${offset}px, 0)`

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
          opacity = (elReachTopDistance - startShowPct) / (solidPct - startShowPct)
        } else if (elReachTopDistance <= startShowPct) {
          opacity = 0
        } else {
          opacity = 1
        }
        elRef.style.transition = 'opacity 200ms'

        opacity = opacity >= 1 ? 1 : opacity <= 0 ? 0 : opacity

        if (elRef.style.opacity != opacity) {
          elRef.style.opacity = opacity
        }
      } else if (!enteredViewport && elRef.style.opacity !== '0') {
        // 元素未进入视口前，若opacity!==0，则初始化元素的opacity
        elRef.style.opacity = 0
      }
    }
  }
}

// Types
export interface IOption {
  speed: number
  isTransparent?: boolean
  startShowPct?: number
  solidPct?: number
}
