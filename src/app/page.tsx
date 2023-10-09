import { memo, type FC } from 'react'

const IndexPage: FC<IProps> = memo(() => {
  return (
    <div className="index-page">
      <h1>Hello world</h1>
      <p>你好啊，我是田若茜，一名前端工程师</p>
    </div>
  )
})

export default IndexPage
IndexPage.displayName = 'IndexPage'

// Types
export interface IProps {
  children?: React.ReactElement
}
