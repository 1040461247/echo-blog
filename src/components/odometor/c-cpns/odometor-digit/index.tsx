'use client'

import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  digit: number
}

const OdometorDigit: FC<IProps> = memo(({ digit }) => {
  const [pauseTransition, setPauseTransition] = useState(false)
  useEffect(() => {
    if (digit === 0) {
      setPauseTransition(true)
    } else {
      pauseTransition && setPauseTransition(false)
    }
  }, [digit])

  return (
    <div className="odometor-digit overflow-hidden w-3 h-4 leading-3">
      <div
        className={`digit-inner text-vertical ${
          pauseTransition ? '' : 'transition-transform'
        } duration-1000 ease-out`}
        style={{ transform: `translate3d(0, -${digit * 10}%, 0)` }}
      >
        0123456789
      </div>
    </div>
  )
})

export default OdometorDigit
OdometorDigit.displayName = 'OdometorDigit'
