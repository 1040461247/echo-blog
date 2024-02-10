'use client'

import { memo, useEffect, useState, type FC } from 'react'
import { useRouter } from 'next/navigation'
import Message from '@/components/message'
import Modal from '@/components/modal'
import { REG_OTP, REG_PHONE, SIGNUP_PATH } from '@/constants'
import useFormValidation, { IValidationRule } from '@/hooks/use-form-validation'
import { loginPhone, sendOtp } from '@/service/modules/user.request'
import ErrorMessage from '../../../components/modal/c-cpns/error-message'
import ModalInput from '@/components/modal/c-cpns/modal-input'
import { useAppDispatch } from '@/hooks/use-store'
import { setRegisteringPhoneAction } from '@/store/slices'
import { useLogin } from '@/hooks/use-login'

// Types
export interface IProps {}

const LoginPage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const login = useLogin()

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
      if (sendOtpRes?.code === 200) {
        Message.success('验证码已发送:)')
        setOtpDisabled(true)
      } else {
        Message.error(sendOtpRes!.msg)
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
  async function handleCommit(e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e && e.preventDefault()
    const errors = validateAll()
    const errorKeys = Object.keys(errors)

    const noErrors = errorKeys.length === 0
    if (noErrors) {
      const { phone, otp } = formData
      const res = await loginPhone(phone, otp)

      // 验证码错误
      const codeError = res?.code !== 200
      if (codeError) {
        Message.error(res!.msg)
        return
      }

      const isRegisteredUser = res?.data.status === 1
      if (isRegisteredUser) {
        login(res.data.user.token)
        router.back()
        Message.success(`欢迎回来，${res.data.user.name}`)
      } else {
        dispatch(setRegisteringPhoneAction(phone))
        router.replace(`${SIGNUP_PATH}`, { scroll: false })
      }
    } else {
      Message.error(errors[errorKeys[0]])
    }
  }

  return (
    <div className="login-page">
      <Modal handleClose={() => router.back()} title="请输入电话号码" subTitle="-以进入EchoBlog-">
        <form className="login-form">
          <div className="form-phone mb-5">
            <ModalInput
              placeholder="电话号码"
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="phone"
              autoFocus
            />
            {errors.phone && <ErrorMessage text={errors.phone} />}
          </div>

          <div className="form-otp mb-5">
            <div className="flex justify-between w-full h-11">
              <ModalInput
                placeholder="验证码"
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
              className="w-full h-11 rounded-md bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors duration-200"
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

export default LoginPage
LoginPage.displayName = 'LoginPage'
