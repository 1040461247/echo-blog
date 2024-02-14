import '@/assets/iconfont/iconfont.css'
import '@/assets/style/reset.css'
import '@/assets/style/common.css'
import '@/assets/style/tailwind.css'
import '@/assets/style/variables.css'
// import '@uiw/react-md-editor/markdown-editor.css'
// import '@uiw/react-markdown-preview/markdown.css'
import Providers from '@/store/providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import 'normalize.css'
import React, { Suspense } from 'react'
import MainHeader from './c-cpns/main-header'
import MainFooter from './c-cpns/main-footer'
import { NavigationEvents } from './c-cpns/navigation-events'

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
  description: 'Welcome to my blog. this is Echo Blog.'
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
        <body className="flex flex-col">
          <MainHeader />
          <div className="flex-1">
            {children}
            {auth}
          </div>
          <MainFooter />

          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </body>
      </html>
    </Providers>
  )
}
