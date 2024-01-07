import { ChangeEvent, useState } from 'react'

// Types
export interface IValidationRule {
  validate: (value: string) => boolean
  message: string
}
export type IValidationRules<T> = Record<keyof T, IValidationRule[]>

// Hook
function useFormValidation<T extends Record<string, any>>(
  initialState: T,
  validationRules: IValidationRules<T>
) {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { name } = e.target
    const error = valiedateField(name)
    setErrors({
      ...errors,
      [name]: error
    })
  }

  function valiedateField(field: string) {
    let error = ''
    const rules = validationRules[field]
    for (const rule of rules) {
      if (rule.validate(formData[field])) {
        continue
      } else {
        error = rule.message
        break
      }
    }
    return error
  }

  function validateAll() {
    const errorsTemp: Record<string, string> = {}
    for (const field in validationRules) {
      const rules = validationRules[field]
      for (const rule of rules) {
        if (rule.validate(formData[field])) {
          continue
        } else {
          errorsTemp[field] = rule.message
          break
        }
      }
    }
    // console.log(errorsTemp)
    setErrors(errorsTemp)
    return errorsTemp
  }

  return { formData, errors, handleChange, handleBlur, validateAll }
}

export default useFormValidation
