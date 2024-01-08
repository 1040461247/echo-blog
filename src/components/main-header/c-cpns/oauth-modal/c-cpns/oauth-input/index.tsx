import type { ChangeEventHandler, FC, FocusEventHandler } from 'react'
import { memo } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
  handleChange: ChangeEventHandler
  handleBlur: FocusEventHandler
  placeholder: string
  customClass?: string
  name: string
}

const OauthInput: FC<IProps> = memo(
  ({ handleChange, handleBlur, placeholder, customClass, name }) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full h-11 bg-transparent p-4 placeholder:text-sm rounded-md border-gray-400 border focus:border-white hover:border-white transition-colors ${customClass}`}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
      />
    )
  }
)

export default OauthInput
OauthInput.displayName = 'OauthInput'
