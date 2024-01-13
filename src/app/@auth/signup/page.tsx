'use client'

import Modal from '@/components/modal'
import { useRouter } from 'next/navigation'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const RegisterPage: FC<IProps> = memo((props, searchParams) => {
  const router = useRouter()
  console.log(searchParams.phone)

  return (
    <div className="register-page">
      <Modal handleClose={() => router.back()} title="创建您的账号">
        <>哈哈哈</>
      </Modal>
    </div>
  )
})

export default RegisterPage
RegisterPage.displayName = 'RegisterPage'
