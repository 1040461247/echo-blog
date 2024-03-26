import { useEffect, useState } from 'react'

export default function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [reachBottom, setReachBottom] = useState(false)

  useEffect(() => {
    const vpHeight = window.innerHeight // 视口高度

    function handleScroll() {
      // 页面垂直滚动距离
      const windowScrollY = window.scrollY
      setScrollY(windowScrollY)

      // 页面是否滚动至底部
      const pageHeight = document.documentElement.scrollHeight
      const distanceToBtm = pageHeight - (vpHeight + windowScrollY)
      distanceToBtm <= 50 ? setReachBottom(true) : setReachBottom(false)
    }

    addEventListener('scroll', handleScroll)

    return () => removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, reachBottom }
}
