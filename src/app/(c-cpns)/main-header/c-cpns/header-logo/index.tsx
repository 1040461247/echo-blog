import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

const HeaderLogo: FC<IProps> = memo(() => {
  return (
    <section className="logo flex-1 flex items-center">
      <Link href="#" className="flex items-center text-[--primary-color] whitespace-nowrap">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12">
          <Image
            src="/images/main-header/logo.svg"
            fill
            sizes="(max-width: 640px) 40px, 46px"
            alt="logo"
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl">Echo Blog</h1>
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
