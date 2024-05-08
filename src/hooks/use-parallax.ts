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
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  const defaultOpt: IOption = {
    speed: -2,
    isTransparent: false,
    startShowPct: 0.2,
    solidPct: 0.5,
  }

  return function (elRef: HTMLElement | null, option = defaultOpt) {
    if (!elRef) return
    if (!option.adapter || Object.keys(option.adapter).length === 0) {
      return parallax(elRef, option, vh, scrollY)
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
      if (vw >= breakpoints[breakPoint]) {
        // 当子option中没有选项时使用父选项
        const supOption = { ...option }
        const subOption = adapters[breakPoint]!
        const endOption = Object.assign(supOption, subOption)
        return parallax(elRef, endOption, vh, scrollY)
      } else {
        return parallax(elRef, option, vh, scrollY)
      }
    }
  }
}

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

// 设置偏移量
function offsettingEl(opt: {
  elRef: HTMLElement
  enteredViewport: boolean
  scrollY: number
  speed?: number
}) {
  const { enteredViewport, speed, elRef } = opt
  if (!enteredViewport || !speed || !elRef) return
  const base = transformSpeedToBase(speed)
  const offset = scrollY * base
  elRef.style.transform = `translate3d(0, ${offset}px, 0)`
}

// 设置透明度
function showEl(opt: {
  elRef: HTMLElement
  enteredViewport: boolean
  elReachTopDistance: number
  startShowPct?: number
  solidPct?: number
}) {
  const { elRef, enteredViewport, elReachTopDistance, startShowPct = 0.2, solidPct = 0.6 } = opt
  if (!enteredViewport) return
  let opacity = 0

  const isInInterval = elReachTopDistance >= startShowPct && elReachTopDistance <= 1
  if (isInInterval) {
    //元素进入显示区间内，opacity跟随滚动偏移量增加（opacity计算的固定公式）
    opacity = (elReachTopDistance - startShowPct) / (solidPct! - startShowPct)
  } else if (elReachTopDistance >= solidPct) {
    // 元素超过显示区间
    opacity = 1
  } else {
    // 元素在显示区间下方
    opacity = 0
  }

  // 边界情况处理
  if (opacity > 1) {
    opacity = 1
  } else if (opacity < 0) {
    opacity = 0
  }
  if (elRef.style.opacity !== String(opacity)) {
    elRef.style.opacity = String(opacity)
  }
}

function parallax(
  elRef: HTMLElement,
  option: IOption | TAdapterOption,
  vh: number,
  scrollY: number,
) {
  const { speed, isTransparent, startShowPct, solidPct, animation = true } = option
  const { top, bottom } = elRef.getBoundingClientRect() // 元素顶/底部距离视口顶部的距离
  const enteredViewport = top <= vh && bottom >= 0 // 元素是否已进入视口
  const elReachTopDistance = 1 - top / vh // 元素到达顶部距离的百分比

  // 增加动画以优化滚动视觉
  if (!elRef.style.transition && animation) {
    elRef.style.transition = 'all 1s cubic-bezier(0.215, 0.61, 0.355, 1)'
  }

  offsettingEl({ elRef, enteredViewport, scrollY, speed })
  isTransparent && showEl({ elRef, enteredViewport, elReachTopDistance, startShowPct, solidPct })
}
