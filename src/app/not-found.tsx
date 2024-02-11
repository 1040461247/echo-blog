import { HOME_PATH } from '@/constants'
import Link from 'next/link'
import { memo, type FC } from 'react'

const NotFound: FC<IProps> = memo(() => {
  return (
    <div className="not-found mt-[10vh]">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href={HOME_PATH}>Return Home</Link>
    </div>
  )
})

export default NotFound
NotFound.displayName = 'NotFound'

// Types
export interface IProps {
  children?: React.ReactElement
}
