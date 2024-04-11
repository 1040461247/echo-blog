import { LOGIN_PATH } from '@/constants'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const CommentPanelAuth: FC<IProps> = memo(() => {
  return (
    <Link
      href={LOGIN_PATH}
      className="absolute inset-x-0 top-12 w-40 h-10 m-auto py-1 px-3 rounded-lg bg-[--primary-color] text-white hover:bg-[--primary-color-dark] text-center leading-8 transition-colors duration-200"
    >
      登录/注册
    </Link>
  )
})

export default CommentPanelAuth
CommentPanelAuth.displayName = 'CommentPanelAuth'
