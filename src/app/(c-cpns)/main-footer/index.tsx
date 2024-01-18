import { memo, type FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const MainFooter: FC<IProps> = memo(() => {
  return (
    <footer className="p-5 bg-white/80 border-t-2 border-black/8">
      <section className="flex py-3">
        {/* Left Area */}
        <article></article>

        {/* Center Area */}
        <article className="flex-1 flex justify-center items-center">footer content</article>

        {/* Right Area */}
        <article></article>
      </section>
    </footer>
  )
})

export default MainFooter
MainFooter.displayName = 'MainFooter'