import useScroll from './use-scroll'

// Types
export type TAdapterOption = Partial<IOption>
export interface IOption {
  speed: number
  isTransparent?: boolean
  startShowPct?: number
  solidPct?: number
  animation?: boolean
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
interface IBreakpoints {
  [key: string]: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export default function useParallax() {
  if (typeof window !== 'object') return
  const { scrollY } = useScroll()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth

  // 转化速度值为偏移量基数：(-10 ~ 10) ->（-1 ~ 1）
  function transformSpeedToBase(speed: number) {
    let base = -speed / 10
    if (speed >= 10) {
      base = -1
    } else if (speed <= -10) {
      base = 1
    }
    return base
  }

  function setParallax(elRef: HTMLElement, option: IOption | TAdapterOption) {
    const { speed, isTransparent, startShowPct, solidPct, animation = true } = option
    const { top, bottom } = elRef.getBoundingClientRect() // 元素顶/底部距离视口顶部的距离
    const enteredViewport = top <= viewportHeight && bottom >= 0 // 元素是否已进入视口
    const elReachTopDistance = 1 - top / viewportHeight // 元素到达顶部距离的百分比

    // 增加动画以优化滚动视觉
    if (!elRef.style.transition && animation) {
      elRef.style.transition = 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'
    }

    // 根据速度设置偏移量
    if (enteredViewport && speed) {
      const base = transformSpeedToBase(speed)
      const offset = scrollY * base
      elRef.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    // 设置透明度
    if (isTransparent && startShowPct) {
      let opacity = 0

      if (enteredViewport) {
        // 元素是否到达需要显示的区间
        const isInInterval = elReachTopDistance >= startShowPct && elReachTopDistance <= 1
        if (isInInterval) {
          // 元素在区间内，opacity跟随滚动偏移量增加
          opacity = (elReachTopDistance - startShowPct) / (solidPct! - startShowPct)
        } else if (elReachTopDistance <= startShowPct) {
          opacity = 0
        } else {
          opacity = 1
        }
        opacity = opacity >= 1 ? 1 : opacity <= 0 ? 0 : opacity
      }

      if (elRef.style.opacity !== String(opacity)) {
        elRef.style.opacity = String(opacity)
      }
    }
  }

  const defaultOption: IOption = {
    speed: -2,
    isTransparent: false,
    startShowPct: 0.2,
    solidPct: 0.5,
  }

  return function parallax(elRef: HTMLElement | null, option = defaultOption) {
    if (!elRef) return
    if (!option.adapter || Object.keys(option.adapter).length === 0) {
      return setParallax(elRef, option)
    }

    // 响应式断点
    const breakpoints: IBreakpoints = {
      xs: 475,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1537,
    }

    const adapters = option.adapter
    for (const breakPoint in adapters) {
      // 当屏幕宽度符合适配断点时，使用各自断点的option
      if (viewportWidth >= breakpoints[breakPoint]) {
        // 当子option中没有选项时使用父选项
        const supOption = { ...option }
        const subOption = adapters[breakPoint]!
        const endOption = Object.assign(supOption, subOption)
        return setParallax(elRef, endOption)
      } else {
        return setParallax(elRef, option)
      }
    }
  }
}
