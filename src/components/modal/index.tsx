'use client'

import usePreventScroll from '@/hooks/use-prevent-scroll'
import Image from 'next/image'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
  isOpen: boolean
  handleModal: (isOpen: boolean) => void
  title: string
  subTitle: string
}

const ModalBox: FC<IProps> = memo(({ children, isOpen, handleModal, title, subTitle }) => {
  // isOpen = true
  usePreventScroll(isOpen)

  function handleClose() {
    handleModal(false)
  }

  return (
    isOpen && (
      <div className={`modal-box fixed inset-0`}>
        {/* Mask */}
        <div
          className="modal-mask absolute inset-0 bg-black/50"
          onClick={() => handleModal(false)}
        ></div>

        {/* Content */}
        <main className="modal-content absolute inset-x-0 mt-[50vh] -translate-y-1/2 mx-auto w-[350px] p-3 rounded-2xl bg-[--bg-dark-blue] text-gray-300 shadow-lg">
          <header className="modal-content-header mb-5">
            <div className="moal-content-header-title flex flex-col text-center">
              <span className="text-xl mb-1">{title}</span>
              <span className="text-sm text-gray-300/80">{subTitle}</span>
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
  )
})

export default ModalBox
ModalBox.displayName = 'ModalBox'
