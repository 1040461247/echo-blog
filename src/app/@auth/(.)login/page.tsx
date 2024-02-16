'use client'

import { memo, type FC, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LOGIN_PATH } from '@/constants'
import dynamic from 'next/dynamic'

// Dynamic Import
const LoginModalContent = dynamic(() => import('./c-cpns/login-modal-content'))

// Types
export interface IProps {}

const LoginModalPage: FC<IProps> = memo(() => {
  const pathname = usePathname()
  const [showLoginModal, setShowLoginModal] = useState(true)

  // 当跳转其他页面时不展示该并行路由内容
  useEffect(() => {
    if (pathname !== LOGIN_PATH) {
      showLoginModal && setShowLoginModal(false)
    } else {
      showLoginModal || setShowLoginModal(true)
    }
  }, [pathname])

  return showLoginModal && <LoginModalContent />
})

export default LoginModalPage
LoginModalPage.displayName = 'LoginModalPage'
