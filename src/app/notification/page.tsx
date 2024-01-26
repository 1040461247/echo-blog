'use client'

import { memo, useState } from 'react'
import type { FC } from 'react'
import { Tab } from '@headlessui/react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const NotificationPage: FC<IProps> = memo(() => {
  const [info, setInfo] = useState('default')

  return (
    <div className="notification-page sm:pt-[38px]">
      <div className="inner-layout flex-col justify-start content-card p-8 text-gray-300">
        <Tab.Group onChange={(index) => index === 1 && setInfo('index1')}>
          <Tab.List>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>{info}</Tab.Panel>
            <Tab.Panel>{info}</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
})

export default NotificationPage
NotificationPage.displayName = 'NotificationPage'
