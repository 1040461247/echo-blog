import Link from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  isLink: boolean
  isActive: boolean
  path?: string
  iconName: string
  text: string
  handleClick?: () => void
  scroll?: boolean
}

const V1MenuItem: FC<IProps> = memo(
  ({
    children,
    isLink = true,
    isActive,
    path = '#',
    iconName,
    text,
    handleClick,
    scroll = true,
  }) => {
    // Common Styles
    const activeLinkStyle = `!text-[--primary-color] border-b-[3px] border-solid border-[--primary-color]`
    const linkStyle = `relative flex items-center px-[1.5vw] py-1.5 text-lg text-gray-300 border-solid hover-highlight hover:border-b-[3px]`

    function showContent() {
      return (
        <>
          <i className={`icon iconfont ${iconName} mr-1`} />
          <span className="text">{text}</span>
        </>
      )
    }

    return isLink ? (
      <Link
        className={`header-item-link ${linkStyle} ${isActive ? activeLinkStyle : ''}`}
        href={path}
        onClick={handleClick}
        scroll={scroll}
      >
        {showContent()}
        {children}
      </Link>
    ) : (
      <div
        className={`group relative flex justify-center header-item-link cursor-pointer ${linkStyle} ${
          isActive ? activeLinkStyle : ''
        }`}
        onClick={handleClick}
      >
        {showContent()}
        {children}
      </div>
    )
  },
)

export default V1MenuItem
V1MenuItem.displayName = 'V1MenuItem'
