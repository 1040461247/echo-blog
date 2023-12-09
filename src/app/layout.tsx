import React from 'react'
import type { Metadata } from 'next'
import Providers from '@/store/providers'
import localFont from 'next/font/local'
import 'normalize.css'
import '@/assets/style/reset.css'
import '@/assets/style/variables.css'
import '@/assets/style/common.css'
import '@/assets/style/tailwind.scss'
import MainHeader from '../components/main-header'
// import MainFooter from '../components/main-footer'

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Alimama_DongFangDaKai_Regular.woff2',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="zh" className={myFont.className}>
        <body>
          <MainHeader />
          {children}
          {/* <MainFooter /> */}
        </body>
      </html>
    </Providers>
  )
}
