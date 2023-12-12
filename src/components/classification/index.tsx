import { memo } from 'react'
import Image from 'next/image'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const classification: FC<IProps> = memo(() => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="classification relative overflow-hidden h-[--ssm-full-height] sm:h-[--sm-full-height] md:h-[--md-full-height] bg-room-static bg-no-repeat bg-center bg-cover">
      <div className="inner-layout justify-start items-end relative">
        <nav className="books absolute inset-x-0 flex overflow-x-scroll hide-scroll">
          {list.map((item) => (
            <div className="book flex-shrink-0 w-[200px]" key={item}>
              <img className="w-[200px]" src="/images/classification/book_yellow.png" alt="book" />
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
})

export default classification
classification.displayName = 'classification'
