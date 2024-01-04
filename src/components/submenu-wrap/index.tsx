import { memo } from 'react'
import SubmenuItem from '../submenu-item'
import type { FC } from 'react'

// Types
export interface IProps {
  children: React.ReactElement<typeof SubmenuItem>[] | React.ReactElement<typeof SubmenuItem>
}

const SubmenuWrap: FC<IProps> = memo(({ children }) => {
  return (
    <nav className="submenu-wrap hidden flex-col absolute top-full p-[0.1333vw] bg-white rounded-[10px] group-hover:flex">
      {children}
    </nav>
  )
})

export default SubmenuWrap
SubmenuWrap.displayName = 'SubmenuWrap'
