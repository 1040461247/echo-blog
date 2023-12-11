import { memo } from 'react'
import Image from 'next/image'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const classification: FC<IProps> = memo(() => {
  return (
    <div className="classification h-[--ssm-full-height] sm:h-[--sm-full-height] md:h-[--md-full-height] bg-room bg-no-repeat bg-center bg-cover">
      <div className="window relative h-[60vh] w-[60vh] mx-auto translate-y-[0px] border">
        <Image
          className="object-contain"
          src="/images/classification/window.png"
          fill
          sizes="100%"
          alt="window"
        />
      </div>
    </div>
  )
})

export default classification
classification.displayName = 'classification'
