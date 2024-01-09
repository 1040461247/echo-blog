import type { FC } from 'react'
import { memo } from 'react'
import V1MenuItem from '../v1-menu-item'

// Types
export interface IProps {
  children?: React.ReactElement
  handleModal: (isOpen: boolean) => void
}

const V1OauthBtn: FC<IProps> = memo(({ handleModal }) => {
  return (
    <div className="v1-oauth-btn">
      <V1MenuItem
        isLink={false}
        isActive={false}
        iconName="icon-user"
        text="登录/注册"
        handleClick={() => handleModal(true)}
      />
    </div>
  )
})

export default V1OauthBtn
V1OauthBtn.displayName = 'V1OauthBtn'
