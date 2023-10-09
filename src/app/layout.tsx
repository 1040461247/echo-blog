import React from 'react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import 'normalize.css'
import '@/assets/style/reset.scss'
import Providers from '@/store/providers'

const myFont = localFont({
  src: [
    {
      path: '../assets/fonts/Alimama_DongFangDaKai_Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Alimama_DongFangDaKai_Regular.woff',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Alimama_DongFangDaKai_Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../assets/fonts/Alimama_DongFangDaKai_Regular.otf',
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
        <body>{children}</body>
      </html>
    </Providers>
  )
}
