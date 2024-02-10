'use client'

import { memo, type FC, useState, useEffect } from 'react'
import FooterOperationTime from './c-cpns/footer-operation-time'
import FooterCopyright from './c-cpns/footer-copyright'
import FooterPageviews from './c-cpns/footer-pageviews'
import { usePathname } from 'next/navigation'

// Types
export interface IProps {
  children?: React.ReactElement
}

const MainFooter: FC<IProps> = memo(() => {
  const hiddenPages = ['/me']
  const [showFooter, setShowFooter] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    hiddenPages.includes(pathname)
      ? showFooter && setShowFooter(false)
      : showFooter || setShowFooter(true)
  }, [pathname])

  return (
    showFooter && (
      <footer className="relative z-40 c-card px-8 py-5 bg-[#2f2f3e] rounded-none text-gray-400 text-sm lg:text-base">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Area */}
          <section className="order-first lg:order-none">
            <span>Echo Blog v1.0.0</span>
          </section>

          {/* Center Area */}
          <section className="order-last lg:order-none flex-1 flex flex-col lg:gap-1 items-center">
            <FooterCopyright />
            <FooterOperationTime />
          </section>

          {/* Right Area */}
          <section>
            <FooterPageviews />
          </section>
        </div>
      </footer>
    )
  )
})

export default MainFooter
MainFooter.displayName = 'MainFooter'
