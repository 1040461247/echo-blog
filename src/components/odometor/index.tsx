'use client'

import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import OdometorDigit from './c-cpns/odometor-digit'

// Types
export interface IProps {
  num: number
}

const Odometor: FC<IProps> = memo(({ num }) => {
  const [numArr, setNumArr] = useState<string[]>([])

  useEffect(() => {
    const numArr = String(num).split('')
    setNumArr(numArr)
  }, [num])

  return (
    <div className="odometor inline-block mx-1">
      <div className="odometor-list flex">
        {numArr.map((item, index) => (
          <OdometorDigit digit={Number(item)} key={index} />
        ))}
      </div>
    </div>
  )
})

export default Odometor
Odometor.displayName = 'Odometor'
