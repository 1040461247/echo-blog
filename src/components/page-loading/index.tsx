import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const PageLoading: FC<IProps> = memo(() => {
  const strArr = 'Echo Blog'.split('').map((item) => (item === ' ' ? '\u00A0' : item))

  return (
    <div className="page-loading fixed z-50 inset-0 bg-[--primary-color]">
      <ul className="loading-inner absolute inset-0 m-auto flex justify-center h-16">
        {strArr.map(async (item, index) => (
          <li
            className="opacity-0 text-[40px] sm:text-[60px] text-white sm:mr-1 animate-throught translate-y-full"
            style={{ animationDelay: `${index * 40}ms` }}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default PageLoading
PageLoading.displayName = 'PageLoading'
