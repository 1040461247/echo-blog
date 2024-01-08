import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  text: string
}

const ErrorMessage: FC<IProps> = memo(({ text }) => {
  return <span className="error-message translate-y-full text-xs text-red-500">{text}</span>
})

export default ErrorMessage
ErrorMessage.displayName = 'ErrorMessage'
