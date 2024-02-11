'use client'

import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: FC<IProps> = memo(({ error, reset }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[20vh]">
      <header className="mb-10 text-center text-gray-300">
        <h2 className="text-4xl mb-2">Oops.</h2>
        <h2 className="text-xl">Something went wrong!</h2>
      </header>

      <button
        className="hover-highlight py-2 px-4 rounded-lg text-gray-300 border"
        onClick={() => reset()}
      >
        try again
      </button>
    </div>
  )
})

export default Error
Error.displayName = 'Error'
