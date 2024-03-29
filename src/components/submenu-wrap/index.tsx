import { memo } from 'react'
import SubmenuItem from '../submenu-item'
import type { FC } from 'react'

// Types
export interface IProps {
  children: React.ReactElement<typeof SubmenuItem>[] | React.ReactElement<typeof SubmenuItem>
}

const SubmenuWrap: FC<IProps> = memo(({ children }) => {
  return (
    <nav className="submenu-wrap invisible opacity-0 translate-y-3 flex flex-col absolute top-full p-1 bg-white rounded-xl group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
      {children}
    </nav>
  )
})

export default SubmenuWrap
SubmenuWrap.displayName = 'SubmenuWrap'
