import { memo } from 'react'
import type { FC } from 'react'
import Link from 'next/link'

// Types
export interface IProps {
  children?: React.ReactElement
  isActive: boolean
  path?: string
  iconName?: string
  text?: string
}

const SubmenuItem: FC<IProps> = memo(({ children, isActive, path = '#', iconName, text }) => {
  return (
    <div className="submenu-item">
      <div
        className={`w-full h-[30px] text-center whitespace-nowrap rounded-xl text-black transition-colors hover:!text-[--primary-color] hover:bg-gray-100 ${
          isActive ? '!text-[--primary-color] bg-gray-100' : ''
        }`}
      >
        {children ? (
          children
        ) : (
          <Link className="inline-block w-full h-full px-[15px] py-[3px]" href={path}>
            <i className={`icon iconfont ${iconName} mr-1`} />
            <span className="text">{text}</span>
          </Link>
        )}
      </div>
    </div>
  )
})

export default SubmenuItem
SubmenuItem.displayName = 'SubmenuItem'