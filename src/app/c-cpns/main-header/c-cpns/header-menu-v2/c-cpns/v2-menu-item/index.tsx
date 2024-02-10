import Link from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  isLink: boolean
  path?: string
  iconName: string
  text: string
  handleClick: () => void
  scroll?: boolean
}

const V2MenuItem: FC<IProps> = memo(
  ({ isLink = true, path, iconName, text, handleClick, scroll = true }) => {
    // Common style
    const itemWrapStyle =
      'menu-item flex justify-center items-center overflow-hidden rounded-md h-9 p-[1px] mb-2 bg-[--btn-gray]'

    function showContent() {
      return (
        <span className="menu-item-inner flex-1 overflow-hidden rounded-md text-gray-300 text-center active:text-white">
          <i className={`iconfont ${iconName} mr-1`}></i>
          <span>{text}</span>
        </span>
      )
    }

    return isLink ? (
      <Link className={`${itemWrapStyle}`} href={path!} onClick={handleClick} scroll={scroll}>
        {showContent()}
      </Link>
    ) : (
      <div className={`${itemWrapStyle}`} onClick={handleClick}>
        {showContent()}
      </div>
    )
  }
)

export default V2MenuItem
V2MenuItem.displayName = 'V2MenuItem'
