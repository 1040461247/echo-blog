import { memo } from 'react'
import type { FC } from 'react'
import V2MenuItem from '../v2-menu-item'
import { LOGIN_PATH } from '@/constants'

// Types
export interface IProps {
  children?: React.ReactElement
  setIsDrawerOpen: (val: boolean) => void
}

const V2AuthNav: FC<IProps> = memo(({ setIsDrawerOpen }) => {
  return (
    <div className="v2-auth-nav">
      <V2MenuItem
        isLink
        path={LOGIN_PATH}
        iconName="icon-home"
        text="登录/注册"
        handleClick={() => setIsDrawerOpen(false)}
        scroll={false}
      />
    </div>
  )
})

export default V2AuthNav
V2AuthNav.displayName = 'V2AuthNav'
