import Message from '@/components/message'
import Modal from '@/components/modal'
import { REG_OTP, REG_PHONE } from '@/constants'
import useFormValidation, { IValidationRule } from '@/hooks/use-form-validation'
import { sendOtp } from '@/service/modules/user.request'
import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import ErrorMessage from './c-cpns/error-message'
import OauthInput from './c-cpns/oauth-input'

// Types
export interface IProps {
  children?: React.ReactElement
  isOpen: boolean
  handleModal: (isOpen: boolean) => void
}

const OauthModal: FC<IProps> = memo(({ isOpen, handleModal }) => {
  // 表单初始化及验证规则配置
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
  const { formData, errors, handleChange, handleBlur, validateAll, valiedateField } =
    useFormValidation(initialFormData, validationRules)

  // 发送验证码
  const [otpDisabled, setOtpDisabled] = useState(false)
  const [countdown, setCountdown] = useState(60)
  async function handleSendOtp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const phoneError = valiedateField('phone')
    if (!phoneError) {
      const sendOtpRes = await sendOtp(formData.phone)
      if (sendOtpRes) {
        Message.success('验证码已发送:)')
        setOtpDisabled(true)
      }
    } else {
      Message.error(phoneError)
    }
  }
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (otpDisabled) {
      timer = setInterval(() => {
        setCountdown((countdown) => countdown - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [otpDisabled])
  useEffect(() => {
    if (countdown <= 0) {
      setOtpDisabled(false)
      setCountdown(60)
    }
  }, [countdown])

  // 提交表单
  function handleCommit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const errors = validateAll()
    const errorKeys = Object.keys(errors)

    if (errorKeys.length === 0) {
      // 表单验证成功，执行提交操作
      console.log('commit')
    } else {
      // 打印第一个错误
      Message.error(errors[errorKeys[0]])
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
            <OauthInput
              placeholder="请输入电话号码"
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="phone"
            />
            {errors.phone && <ErrorMessage text={errors.phone} />}
          </div>

          <div className="form-otp mb-5">
            <div className="flex justify-between w-full h-11">
              <OauthInput
                placeholder="请输入验证码"
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="otp"
                customClass="flex-1 rounded-r-none"
              />
              <button
                className="px-4 bg-gray-300 text-[--bg-dark-blue] rounded-r-md whitespace-nowrap hover:bg-gray-200 transition-colors disabled:hover:bg-gray-300 disabled:hover:cursor-not-allowed"
                onClick={(e) => handleSendOtp(e)}
                disabled={otpDisabled}
              >
                {otpDisabled ? `${countdown}秒后重新获取` : '验证码'}
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
