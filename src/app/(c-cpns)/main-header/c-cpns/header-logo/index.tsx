import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
// Import Types
import type { FC } from 'react'

const HeaderLogo: FC<IProps> = memo(() => {
  return (
    <section className="logo flex-1 flex items-center">
      <Link href="#" className="flex items-center text-[--primary-color] whitespace-nowrap">
        <Image src="/images/main-header/logo.svg" width={46} height={46} alt="logo" />
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
