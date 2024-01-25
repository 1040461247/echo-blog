import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  text: string | number
  onHandle: () => void
  disabled?: boolean
  isActive?: boolean
}

const PaginationBtn: FC<IProps> = memo(({ text, onHandle, disabled = false, isActive = false }) => {
  return (
    <button
      className={`pagination-btn cursor-pointer c-card hover-highlight disabled:cursor-not-allowed disabled:text-gray-700 disabled:border-gray-700 w-9 h-9 mr-2 leading-[30px] rounded-lg text-center ${
        isActive ? 'bg-[--primary-color] hover:text-white' : ''
      }`}
      onClick={onHandle}
      disabled={disabled}
    >
      {text}
    </button>
  )
})

export default PaginationBtn
PaginationBtn.displayName = 'PaginationBtn'
