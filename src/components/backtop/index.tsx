'use client'

import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const BackTop: FC<IProps> = memo(() => {
  const [showBacktop, setShowBacktop] = useState(false)

  useEffect(() => {
    const viewportHeight = window.innerHeight * 2 // 2倍视口高度

    function handleScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      scrollY >= viewportHeight ? setShowBacktop(true) : setShowBacktop(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleBacktop() {
    scrollTo({ top: 0 })
  }

  return (
    showBacktop && (
      <button
        className="backtop fixed right-5 bottom-20 sm:right-10 sm:bottom-[20vh] z-50 rotate-180 p-2"
        onClick={handleBacktop}
      >
        <Image
          className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10"
          src="/images/common/backtop.png"
          width={0}
          height={0}
          sizes="5vw"
          alt="backtop"
        />
      </button>
    )
  )
})

export default BackTop
BackTop.displayName = 'BackTop'
