import { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Transition } from '@headlessui/react'
import type { FC } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
}

const Drawer: FC<IProps> = memo(({ children, isOpen, onClose }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen)
  const durationTime = 300

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsDrawerOpen(true), 50) // 添加延迟以确保过渡效果正常
    } else {
      setTimeout(() => setIsDrawerOpen(false), durationTime) // 添加延迟以确保过渡效果正常
    }
  }, [isOpen])

  // 处理关闭抽屉事件
  const handleClose = () => {
    setIsDrawerOpen(false)
    setTimeout(() => {
      onClose()
    }, durationTime) // 添加延迟以确保过渡效果正常
  }

  return (
    <div
      className={classNames('group fixed inset-0 z-50', {
        hidden: !isOpen
      })}
    >
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      {/* 抽屉内容 */}
      <Transition
        show={isDrawerOpen}
        enter={`transition-transform duration-${durationTime} ease-out`}
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave={`transition-transform duration-${durationTime} ease-in`}
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div
          className={`fixed inset-y-0 right-0 max-w-full w-full xs:w-64 h-[100vh] p-4 bg-[--bg-dark-blue] text-gray-400 shadow-lg transition-all duration-300`}
        >
          {/* 抽屉头部 */}
          <div className="flex justify-end">
            <button
              className="hover:text-gray-300 focus:outline-none transition-colors"
              onClick={handleClose}
            >
              <Image src="/images/common-icons/close.svg" width={30} height={30} alt="exit" />
            </button>
          </div>

          {/* 抽屉主体内容 */}
          <div className="mt-4">{children}</div>
        </div>
      </Transition>
    </div>
  )
})

export default Drawer
Drawer.displayName = 'Drawer'
