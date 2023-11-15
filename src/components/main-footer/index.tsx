import { memo, type FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const MainFooter: FC<IProps> = memo(() => {
  return (
    <footer className="p-5 bg-white/80 border-t-2 border-black/8">
      <div className="flex py-3">
        {/* Left Area */}
        <div></div>

        {/* Center Area */}
        <div className="flex-1 flex justify-center items-center">footer content</div>

        {/* Right Area */}
        <div></div>
      </div>
    </footer>
  )
})

export default MainFooter
MainFooter.displayName = 'MainFooter'
