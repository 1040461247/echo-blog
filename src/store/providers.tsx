'use client'

import { memo } from 'react'
import { Provider } from 'react-redux'
import store from './'

function Providers(props: React.PropsWithChildren) {
  return <Provider store={store}>{props.children}</Provider>
}

export default memo(Providers)
