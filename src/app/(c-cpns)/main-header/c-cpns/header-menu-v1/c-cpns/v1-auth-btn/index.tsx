import type { FC } from 'react'
import { memo } from 'react'
import V1MenuItem from '../v1-menu-item'
import { LOGIN_PATH } from '@/constants'

// Types
export interface IProps {
  children?: React.ReactElement
}

const V1OauthBtn: FC<IProps> = memo(() => {
  return (
    <div className="v1-oauth-btn">
      <V1MenuItem
        isLink
        path={LOGIN_PATH}
        isActive={false}
        iconName="icon-user"
        text="登录/注册"
        scroll={false}
      />
    </div>
  )
})

export default V1OauthBtn
V1OauthBtn.displayName = 'V1OauthBtn'
