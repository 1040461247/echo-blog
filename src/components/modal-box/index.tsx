'use client'

import usePreventScroll from '@/hooks/prevent-scroll'
import Image from 'next/image'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  isOpen: boolean
  handleModal: (isOpen: boolean) => void
}

const ModalBox: FC<IProps> = memo(({ isOpen, handleModal }) => {
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
              <span className="text-xl mb-1">请输入电话号码</span>
              <span className="text-sm text-gray-300/80">-以进入EchoBlog-</span>
            </div>
            <button
              className="absolute top-3 right-3 hover:text-gray-300 focus:outline-none transition-colors p-1"
              onClick={handleClose}
            >
              <Image src="/images/common/close.svg" width={20} height={20} alt="exit" />
            </button>
          </header>

          <form className="modal-content-form">
            <div className="phone-number flex justify-between w-full h-10 mb-5">
              <input
                type="text"
                placeholder="请输入电话号码"
                className="bg-transparent flex-1 p-4 placeholder:text-sm rounded-l-md border-gray-400 border focus:border-white hover:border-white transition-colors"
              />
              <button className="px-4 bg-gray-300 text-[--bg-dark-blue] rounded-r-md whitespace-nowrap hover:bg-white transition-colors">
                验证码
              </button>
            </div>
            <div className="oauth-btn">
              <button className="w-full h-10 rounded-md bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors">
                注册或登录
              </button>
            </div>
          </form>
        </main>
      </div>
    )
  )
})

export default ModalBox
ModalBox.displayName = 'ModalBox'
