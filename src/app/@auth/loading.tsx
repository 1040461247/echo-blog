import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const AuthLoading: FC<IProps> = memo(() => {
  return null
})

export default AuthLoading
AuthLoading.displayName = 'AuthLoading'
