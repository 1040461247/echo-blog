import '@/assets/iconfont/iconfont.css'
import '@/assets/style/reset.css'
import '@/assets/style/common.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/variables.css'
import Providers from '@/store/providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import 'normalize.css'
import React from 'react'
import MainHeader from './(c-cpns)/main-header'

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Alimama_DongFangDaKai_Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Alimama_DongFangDaKai_Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Echo - 欢迎来到我的思维广场',
  description: 'Welcome to my blog. this is Echo.'
}

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode
  auth: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="zh" className={myFont.className}>
        <body>
          <MainHeader />
          {children}
          {auth}
        </body>
      </html>
    </Providers>
  )
}
