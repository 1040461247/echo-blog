'use client'

import usePreventScroll from '@/hooks/use-prevent-scroll'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
  handleClose?: () => void
  title: string
  subTitle?: string | null
}

const Modal: FC<IProps> = memo(({ children, handleClose, title, subTitle }) => {
  handleClose ??= () => router.back()

  const router = useRouter()
  const [opened, setOpened] = useState(false)

  usePreventScroll(true)

  useEffect(() => {
    setOpened(true)
  }, [])

  function handleModalClose() {
    setOpened(false)
    setTimeout(() => handleClose!(), 300)
  }

  return (
    <div className={`modal fixed inset-0 z-40`}>
      {/* Mask */}
      <div
        className={`modal-mask absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          opened ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleModalClose}
      ></div>

      {/* Content */}
      <main
        className={`modal-content absolute inset-x-0 px-5 py-7 pt-[--ssm-modal-pt] mt-[50vh] -translate-y-1/2 mx-auto w-full h-full xs:w-[475px] xs:h-auto xs:p-6 rounded-2xl bg-[--bg-dark-blue] text-gray-300 shadow-lg transition-all duration-300 ${
          opened ? 'opacity-100 xs:!scale-100' : 'opacity-0 xs:scale-75'
        }`}
      >
        <header className="modal-content-header mb-5">
          <div className="moal-content-header-title flex flex-col text-center">
            <span className="text-xl mb-1">{title}</span>
            {subTitle && <span className="text-sm text-gray-300/80">{subTitle}</span>}
          </div>
          <button
            className="absolute top-3 right-3 hover:text-gray-300 focus:outline-none transition-colors p-1"
            onClick={handleModalClose}
          >
            <Image src="/images/common/close.svg" width={20} height={20} alt="exit" />
          </button>
        </header>

        {children}
      </main>
    </div>
  )
})

export default Modal
Modal.displayName = 'Modal'
