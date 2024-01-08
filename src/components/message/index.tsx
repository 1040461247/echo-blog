'use client'

import uuid from '@/utils/uuid'
import { Transition } from '@headlessui/react'
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
interface IMessageQueueItem extends IMessageOption {
  id: string
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
    containerEl.className = 'flex flex-col items-center fixed inset-x-0 top-0 z-50'
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
  const [isVisible, setIsVisible] = useState(true)

  // 消息组件显示三秒
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [])

  // 当过渡动画执行完毕后，移除消息组件
  const clear = () => removeMessage(id)

  const typeStyle: Record<keyof IPropsMessage, string> = {
    info: 'text-[#7e7e7e] bg-[#efefef] border-[#bababa]',
    success: 'text-[#0d8a0d] bg-[#c9f3c9] border-[#50b250]',
    warn: 'text-[#9f9f00] bg-[#ffe89c] border-[#dddd00]',
    error: 'text-[#db1a1a] bg-[#ffbdbd] border-[#eb5757]'
  }

  return (
    <Transition
      show={isVisible}
      enter="transition-all duration-300"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100 translate-y-0"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
      afterLeave={clear}
      appear
      className={`base-message mt-3 py-[9px] px-3 rounded-lg ${typeStyle[type]}`}
      ref={messageRef}
    >
      {message}
    </Transition>
  )
})

BaseMessage.displayName = 'BaseMessage'

const Message: IPropsMessage = {
  info: (message: string) => addMessage({ type: 'info', message }),
  success: (message: string) => addMessage({ type: 'success', message }),
  warn: (message: string) => addMessage({ type: 'warn', message }),
  error: (message: string) => addMessage({ type: 'error', message })
}

export default Message
