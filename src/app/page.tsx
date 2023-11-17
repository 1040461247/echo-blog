import { memo } from 'react'

// Types import
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const IndexPage: FC<IProps> = memo(() => {
  return <div className="index-page"></div>
})

export default IndexPage
IndexPage.displayName = 'IndexPage'
