import { HOME_PATH } from '@/constants'
import Link from 'next/link'
import { memo, type FC } from 'react'

const NotFound: FC<IProps> = memo(() => {
  return (
    <div className="not-found flex justify-center mt-10 bg-[--bg-dark-blue]">
      <div className="not-found-inner inner-layout flex-col gap-5 text-center text-gray-300">
        <h2 className="text-3xl sm:text-5xl">404 页面不存在</h2>
        <Link
          className="py-3 px-4 rounded-lg border border-gray-600 bg-white/5 text-white text-lg hover-highlight hover:shadow-lg"
          href={HOME_PATH}
        >
          <i className="iconfont icon-home mr-1 text-lg" />
          <span>返回首页</span>
        </Link>
      </div>
    </div>
  )
})

export default NotFound
NotFound.displayName = 'NotFound'

// Types
export interface IProps {
  children?: React.ReactElement
}
