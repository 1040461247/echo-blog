import type { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  handleChange: ChangeEventHandler
  handleKeyUp?: KeyboardEventHandler
  handleBlur: FocusEventHandler
  placeholder: string
  customClass?: string
  name: string
  type?: 'text' | 'password'
  autoFocus?: boolean
}

const ModalInput: FC<IProps> = memo(
  ({
    handleChange,
    handleBlur,
    placeholder,
    customClass,
    name,
    type = 'text',
    handleKeyUp,
    autoFocus = false,
  }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 bg-transparent p-4 placeholder:text-sm rounded-md border-gray-400 border focus:border-white hover:border-white transition-colors ${customClass}`}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        onKeyUp={handleKeyUp}
        autoFocus={autoFocus}
      />
    )
  },
)

export default ModalInput
ModalInput.displayName = 'ModalInput'
