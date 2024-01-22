import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const FriendsHeader: FC<IProps> = memo(() => {
  return (
    <header className="friends-header flex mb-7">
      <i className="iconfont icon-link text-4xl" />
      <div>
        <h2 className="text-4xl mb-2">友链</h2>
        <h3>~ 欢迎参观其他大佬的博客！~</h3>
      </div>
    </header>
  )
})

export default FriendsHeader
FriendsHeader.displayName = 'FriendsHeader'
