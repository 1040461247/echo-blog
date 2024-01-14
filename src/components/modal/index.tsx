'use client'

import usePreventScroll from '@/hooks/use-prevent-scroll'
import Image from 'next/image'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
  handleClose: () => void
  title: string
  subTitle?: string | null
}

const Modal: FC<IProps> = memo(({ children, handleClose, title, subTitle }) => {
  // isOpen = true
  usePreventScroll(true)

  return (
    <div className={`modal fixed inset-0 z-40`}>
      {/* Mask */}
      <div className="modal-mask absolute inset-0 bg-black/50" onClick={handleClose}></div>

      {/* Content */}
      <main className="modal-content absolute inset-x-0 px-10 pb-10 pt-[--ssm-modal-pt] mt-[50vh] -translate-y-1/2 mx-auto w-full h-full xs:w-[475px] xs:h-auto xs:p-6 rounded-2xl bg-[--bg-dark-blue] text-gray-300 shadow-lg transition-all duration-300">
        <header className="modal-content-header mb-5">
          <div className="moal-content-header-title flex flex-col text-center">
            <span className="text-xl mb-1">{title}</span>
            {subTitle && <span className="text-sm text-gray-300/80">{subTitle}</span>}
          </div>
          <button
            className="absolute top-3 right-3 hover:text-gray-300 focus:outline-none transition-colors p-1"
            onClick={handleClose}
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
