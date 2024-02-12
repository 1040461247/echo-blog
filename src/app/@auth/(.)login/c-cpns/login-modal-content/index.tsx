import LoginContent from '@/app/login/c-cpns/login-content'
import Modal from '@/components/modal'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const LoginModalContent: FC<IProps> = memo(() => {
  return (
    <div className="login-modal-content">
      <Modal title="请输入电话号码" subTitle="-以进入EchoBlog-">
        <LoginContent />
      </Modal>
    </div>
  )
})

export default LoginModalContent
LoginModalContent.displayName = 'LoginModalContent'
