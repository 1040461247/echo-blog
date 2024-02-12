import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const LoginHeader: FC<IProps> = memo(() => {
  return (
    <header className="login-header mb-5">
      <div className="moal-content-header-title flex flex-col text-center">
        <span className="mb-1 text-xl text-gray-300">请输入电话号码</span>
        <span className="text-sm text-gray-300/80">-以进入EchoBlog-</span>
      </div>
    </header>
  )
})

export default LoginHeader
LoginHeader.displayName = 'LoginHeader'
