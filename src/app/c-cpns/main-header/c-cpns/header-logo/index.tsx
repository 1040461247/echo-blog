import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

const HeaderLogo: FC<IProps> = memo(() => {
  return (
    <section className="logo flex-1 flex items-center">
      <Link href="#" className="flex items-center text-[--primary-color] whitespace-nowrap">
        <div className="relative w-9 h-9 mr-2 sm:w-10 sm:h-10 md:w-12 md:h-12">
          <Image
            src="/images/main-header/logo.png"
            fill
            sizes="200px"
            alt="logo"
            className="object-contain"
          />
        </div>
        <h1 className="rainbow-text text-2xl sm:text-3xl">Echo&nbsp;Blog</h1>
      </Link>
    </section>
  )
})

export default HeaderLogo
HeaderLogo.displayName = 'HeaderLogo'

// Types
export interface IProps {
  children?: React.ReactElement
}
