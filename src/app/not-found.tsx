import { memo, type FC } from 'react'

const NotFound: FC<IProps> = memo(() => {
  return <div className="">404 NotFound</div>
})

export default NotFound
NotFound.displayName = 'NotFound'

// Types
export interface IProps {
  children?: React.ReactElement
}
