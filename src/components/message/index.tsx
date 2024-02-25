'use client'

import uuid from '@/utils/uuid'
import type { FC } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

// Types
type TMessage = 'info' | 'success' | 'warn' | 'error'
type TMessageInput = (message: string) => void
interface IPropsMessage {
  info: TMessageInput
  success: TMessageInput
  warn: TMessageInput
  error: TMessageInput
}
interface IProps {
  children?: React.ReactElement
  type: TMessage
  message: string
  id: string
}
interface IMessageOption {
  type: TMessage
  message: string
}
export interface IMessageQueueItem extends IMessageOption {
  id: string
}
interface ITypeStyle {
  customClass: string
  iconName: string
}

const MESSAGE_QUEUE: IMessageQueueItem[] = []
const CONTAINER_ID = 'message-container'

// 新增消息
function addMessage(messageOption: IMessageOption) {
  const id = uuid()
  MESSAGE_QUEUE.push({ ...messageOption, id })
  renderMessage([...MESSAGE_QUEUE])
}

// 删除消息
function removeMessage(id: string) {
  const position = MESSAGE_QUEUE.findIndex((item) => item.id === id)
  MESSAGE_QUEUE.splice(position, 1)
  renderMessage([...MESSAGE_QUEUE])
}

// 创建容器
function createContainer() {
  let containerEl = document.getElementById(CONTAINER_ID)

  if (!containerEl) {
    containerEl = document.createElement('div')
    containerEl.setAttribute('id', CONTAINER_ID)
    containerEl.className = 'fixed left-1/2 -translate-x-1/2 top-0 z-50'
    document.body.appendChild(containerEl)
  }

  return containerEl
}

// 渲染消息
let containerRoot: any
function renderMessage(messageQueue: IMessageQueueItem[]) {
  const container = createContainer()
  if (!containerRoot) {
    containerRoot = createRoot(container)
  }
  const MessageComponents = messageQueue.map((props) => <BaseMessage {...props} key={props.id} />)
  containerRoot.render(MessageComponents)
}

// 消息组件
const BaseMessage: FC<IProps> = memo(({ type, message, id }) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const isInitial = useRef(true)
  const [isVisible, setIsVisible] = useState(false)

  // 消息组件显示三秒
  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  // 当过渡动画执行完毕后，移除消息组件
  useEffect(() => {
    if (!isVisible && !isInitial.current) {
      setTimeout(() => removeMessage(id), 300)
    }
    isInitial.current = false
  }, [isVisible])

  const typeStyle: Record<keyof IPropsMessage, ITypeStyle> = {
    info: {
      customClass: 'text-[#909399] bg-[#f4f4f5] border-[#e9e9eb]',
      iconName: 'icon-info',
    },
    success: {
      customClass: 'text-[#67c23a] bg-[#f0f9eb] border-[#e1f3d8]',
      iconName: 'icon-success',
    },
    warn: {
      customClass: 'text-[#e6a23c] bg-[#fdf6ec] border-[#faecd8]',
      iconName: 'icon-warn',
    },
    error: {
      customClass: 'text-[#f56c6c] bg-[#fef0f0] border-[#fde2e2]',
      iconName: 'icon-error',
    },
  }

  const { customClass, iconName } = typeStyle[type]

  return (
    <div
      className={`base-message flex items-center mt-3 py-[15px] px-[19px] rounded-lg text-sm border border-solid ${customClass} transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
      ref={messageRef}
    >
      <i className={`iconfont ${iconName} mr-2`} />
      <span>{message}</span>
    </div>
  )
})

BaseMessage.displayName = 'BaseMessage'

const Message: IPropsMessage = {
  info: (message: string) => addMessage({ type: 'info', message }),
  success: (message: string) => addMessage({ type: 'success', message }),
  warn: (message: string) => addMessage({ type: 'warn', message }),
  error: (message: string) => addMessage({ type: 'error', message }),
}

export default Message
