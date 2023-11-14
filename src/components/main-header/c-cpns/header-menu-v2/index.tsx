import { memo, useState } from 'react'
import Image from 'next/image'
import Drawer from '@/components/drawer'

// Import Types
import type { FC } from 'react'

const HeaderMenubutton: FC<IProps> = memo(() => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <section className="md:hidden">
      {/* MenuBtn */}
      <div className="flex items-center h-full  bg-red px-2" onClick={() => setIsDrawerOpen(true)}>
        <Image src="/images/main-header/menu.svg" width={25} height={25} alt="menubtn"></Image>
      </div>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div>sdf</div>
      </Drawer>
    </section>
  )
})

export default HeaderMenubutton
HeaderMenubutton.displayName = 'HeaderMenubutton'

// Types
export interface IProps {
  children?: React.ReactElement
}
