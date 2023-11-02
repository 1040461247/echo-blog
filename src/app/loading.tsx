import { memo, type FC } from 'react'

const Loading: FC<IProps> = memo(() => {
  return <div className="">Loading...</div>
})

export default Loading
Loading.displayName = 'Loading'

// Types
export interface IProps {
  children?: React.ReactElement
}
