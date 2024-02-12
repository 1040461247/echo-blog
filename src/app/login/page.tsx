import { memo } from 'react'
import type { FC } from 'react'
import LoginContent from './c-cpns/login-content'
import LoginHeader from './c-cpns/login-header'

// Types
export interface IProps {
  children?: React.ReactElement
}

const LoginPage: FC<IProps> = memo(() => {
  return (
    <div className="login-page content-card xs:w-[475px] px-5 py-7 mx-auto sm:my-[10vh]">
      <LoginHeader />
      <LoginContent />
    </div>
  )
})

export default LoginPage
LoginPage.displayName = 'LoginPage'
