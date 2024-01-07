import Modal from '@/components/modal'
import { REG_OTP, REG_PHONE } from '@/constants'
import useFormValidation, { IValidationRule } from '@/hooks/form-validation'
import type { FC } from 'react'
import { memo, useState } from 'react'
import ErrorMessage from './error-message'

// Types
export interface IProps {
  children?: React.ReactElement
  isOpen: boolean
  handleModal: (isOpen: boolean) => void
}

const OauthModal: FC<IProps> = memo(({ isOpen, handleModal }) => {
  const [canSendOtp, setCanSendOtp] = useState(true)

  const initialFormData = { phone: '', otp: '' }
  const validationRules: Record<keyof typeof initialFormData, IValidationRule[]> = {
    phone: [
      {
        validate: (value) => !!value,
        message: '电话号码不能为空'
      },
      {
        validate: (value) => REG_PHONE.test(value),
        message: '请输入合法的电话号码'
      }
    ],
    otp: [
      {
        validate: (value) => !!value,
        message: '验证码不能为空'
      },
      {
        validate: (value) => REG_OTP.test(value),
        message: '请输入合法的验证码'
      }
    ]
  }
  const { formData, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    initialFormData,
    validationRules
  )

  function handleSendOtp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    console.log('send otp')
  }
  function handleCommit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const errors = validateAll()
    if (Object.keys(errors).length === 0) {
      console.log('commit')
    }
  }

  return (
    <div className="oauth-modal">
      <Modal
        isOpen={isOpen}
        handleModal={handleModal}
        title="请输入电话号码"
        subTitle="-以进入EchoBlog-"
      >
        <form className="modal-content-form">
          <div className="form-phone mb-5">
            <input
              type="text"
              placeholder="请输入电话号码"
              className="w-full h-11 bg-transparent p-4 placeholder:text-sm rounded-md border-gray-400 border focus:border-white hover:border-white transition-colors"
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
            />
            {errors.phone && <ErrorMessage text={errors.phone} />}
          </div>

          <div className="form-otp mb-5">
            <div className="flex justify-between w-full h-11">
              <input
                type="text"
                placeholder="请输入验证码"
                className="w-full h-11 bg-transparent flex-1 p-4 placeholder:text-sm rounded-l-md border-gray-400 border focus:border-white hover:border-white transition-colors"
                onChange={handleChange}
                onBlur={handleBlur}
                name="otp"
              />
              <button
                className="px-4 bg-gray-300 text-[--bg-dark-blue] rounded-r-md whitespace-nowrap hover:bg-gray-200 transition-colors"
                onClick={(e) => handleSendOtp(e)}
                disabled={!canSendOtp}
              >
                验证码
              </button>
            </div>
            {errors.otp && <ErrorMessage text={errors.otp} />}
          </div>

          <div className="form-commit">
            <button
              className="w-full h-11 rounded-md bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors"
              onClick={handleCommit}
            >
              注册或登录
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
})

export default OauthModal
OauthModal.displayName = 'OauthModal'
