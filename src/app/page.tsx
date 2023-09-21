'use client'

import { memo, type FC } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { increment } from '@/store/slices/counter'

const IndexPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()

  function handleIncrement() {
    dispatch(increment(1))
  }

  const { count } = useAppSelector(
    (rootState) => ({
      count: rootState.counter.count
    }),
    shallowEqual
  )

  return (
    <div className="index-page">
      <h1>{count}</h1>
      <button onClick={() => handleIncrement()}>+1</button>
    </div>
  )
})

export default IndexPage
IndexPage.displayName = 'IndexPage'

// Types
export interface IProps {
  children?: React.ReactElement
}
