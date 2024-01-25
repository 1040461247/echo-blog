import { useEffect, useState } from 'react'
import throttle from '@/utils/throttle'

export default function useReachBottom() {
  const [reachedBottom, setReachedBottom] = useState(false)

  useEffect(() => {
    const viewportHeight = window.innerHeight // 视口高度
    function handleScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop // 滚动条当前位置
      const totalHeight = document.documentElement.scrollHeight // 页面总高度
      const distanceToBottom = totalHeight - (scrollY + viewportHeight)
      distanceToBottom <= 50 ? setReachedBottom(true) : setReachedBottom(false)
    }
    window.addEventListener('scroll', throttle(handleScroll, 50))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [reachedBottom]
}
