import { PREVENT_SCROLL_CLASSNAME } from '@/constants'
import { useEffect } from 'react'

function usePreventScroll(isOpen: boolean) {
  useEffect(() => {
    // 阻止页面滚动
    if (isOpen) {
      document.body.classList.add(PREVENT_SCROLL_CLASSNAME)
    } else {
      document.body.classList.remove(PREVENT_SCROLL_CLASSNAME)
    }

    return () => document.body.classList.remove(PREVENT_SCROLL_CLASSNAME)
  }, [isOpen])
}

export default usePreventScroll
