import { memo, type FC } from 'react'
import './style.scss'

const MainFooter: FC<IProps> = memo(() => {
  return (
    <footer className="main-footer">
      <div className="inner">
        <div className="left"></div>
        <div className="center">footer content</div>
        <div className="right"></div>
      </div>
    </footer>
  )
})

export default MainFooter
MainFooter.displayName = 'MainFooter'

// Types
export interface IProps {
  children?: React.ReactElement
}
