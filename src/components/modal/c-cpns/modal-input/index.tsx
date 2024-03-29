import type { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  onChange: ChangeEventHandler
  onEnterUp?: KeyboardEventHandler
  onBlur: FocusEventHandler
  placeholder: string
  customClass?: string
  name: string
  type?: 'text' | 'password'
  autoFocus?: boolean
}

const ModalInput: FC<IProps> = memo(
  ({
    onChange,
    onBlur,
    onEnterUp,
    placeholder,
    customClass,
    name,
    type = 'text',
    autoFocus = false,
  }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 bg-transparent p-4 placeholder:text-sm rounded-md border-gray-400 border focus:border-white hover:border-white transition-colors ${customClass}`}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onKeyUp={(e) => e.code === 'Enter' && onEnterUp?.(e)}
        autoFocus={autoFocus}
      />
    )
  },
)

export default ModalInput
ModalInput.displayName = 'ModalInput'
