import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

async function getData() {
  await new Promise((resolve) => {
    setTimeout(resolve, 24 * 60 * 60 * 1000)
  })
  return 'DemoPage'
}

const DemoPage: FC<IProps> = memo(async () => {
  const msg = await getData()

  return <div className="demo-page">hello {msg}</div>
})

export default DemoPage
DemoPage.displayName = 'DemoPage'
