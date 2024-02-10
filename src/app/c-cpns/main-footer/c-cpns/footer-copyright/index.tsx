import { memo } from 'react'
import type { FC } from 'react'
import profile from '@/assets/data/profile.json'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FooterCopyright: FC<IProps> = memo(() => {
  return (
    <div className="footer-copyright">
      <span>&copy; 2024 - 至今</span>
      <span className="ml-1">
        <i className="iconfont icon-developer mx-1" />
        <span>By {profile.nickName}</span>
      </span>
    </div>
  )
})

export default FooterCopyright
FooterCopyright.displayName = 'FooterCopyright'
