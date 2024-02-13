import { memo } from 'react'
import SubmenuItem from '../submenu-item'
import type { FC } from 'react'

// Types
export interface IProps {
  children: React.ReactElement<typeof SubmenuItem>[] | React.ReactElement<typeof SubmenuItem>
}

const SubmenuWrap: FC<IProps> = memo(({ children }) => {
  return (
    <nav className="submenu-wrap invisible origin-top-right opacity-0 scale-50 flex flex-col absolute top-full p-1 bg-white rounded-xl group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all">
      {children}
    </nav>
  )
})

export default SubmenuWrap
SubmenuWrap.displayName = 'SubmenuWrap'
