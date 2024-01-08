import usePreventScroll from '@/hooks/use-prevent-scroll'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
}

const Drawer: FC<IProps> = memo(({ children, isOpen, onClose }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen)
  const durationTime = 300

  usePreventScroll(isOpen)
  useEffect(() => {
    // 添加延迟以确保过渡效果正常
    if (isOpen) {
      setTimeout(() => setIsDrawerOpen(true), 50)
    } else {
      setTimeout(() => setIsDrawerOpen(false), durationTime)
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
      {/* Mask */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      {/* Drawer Wrap */}
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
          className={`fixed inset-y-0 right-0 max-w-full w-full xs:w-64 h-[100vh] p-4 bg-[--bg-dark-blue] text-gray-300 shadow-lg transition-all duration-300`}
        >
          {/* Drawer Header */}
          <header className="flex justify-end">
            <button
              className="hover:text-gray-300 focus:outline-none transition-colors p-1"
              onClick={handleClose}
            >
              <Image src="/images/common/close.svg" width={20} height={20} alt="exit" />
            </button>
          </header>

          {/* Drawer Main Content */}
          <main className="overflow-y-auto hide-scroll h-full mt-4">{children}</main>
        </div>
      </Transition>
    </div>
  )
})

export default Drawer
Drawer.displayName = 'Drawer'
