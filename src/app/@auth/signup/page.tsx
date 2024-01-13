'use client'

import Modal from '@/components/modal'
import { useAppSelector } from '@/hooks/use-store'
import { useRouter } from 'next/navigation'
import { memo, useState } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import AuthInput from '../c-cpns/auth-input'
import useFormValidation, { IValidationRule } from '@/hooks/use-form-validation'
import { REG_NAME_CHARACTER, REG_NAME_LENGTH, REG_PASSWORD_LENGTH, TOKEN } from '@/constants'
import ErrorMessage from '../c-cpns/error-message'
import { signup } from '@/service/modules/user.request'
import Message from '@/components/message'
import encryptPhone from '@/utils/encrypt-phone'

// Types
export interface IProps {
  children?: React.ReactElement
}

const RegisterPage: FC<IProps> = memo(() => {
  const router = useRouter()
  const [isShowPwd, setIsShowPwd] = useState(false)

  const { registeringPhone } = useAppSelector(
    (state) => ({
      registeringPhone: state.user.registeringPhone
    }),
    shallowEqual
  )

  // 表单初始化及验证规则配置
  const initialFormData = { name: '', password: '', rePassword: '' }
  const validationRules: Record<keyof typeof initialFormData, IValidationRule[]> = {
    name: [
      {
        validate: (value) => !!value,
        message: '用户名不能为空'
      },
      {
        validate: (value) => REG_NAME_LENGTH.test(value),
        message: '请输入3~20个字符'
      },
      {
        validate: (value) => REG_NAME_CHARACTER.test(value),
        message: '支持数字、字母、下划线'
      }
    ],
    password: [
      {
        validate: (value) => !!value,
        message: '密码不能为空'
      },
      {
        validate: (value) => REG_PASSWORD_LENGTH.test(value),
        message: '密码长度至少8位'
      }
    ],
    rePassword: [
      {
        validate: (value) => !!value,
        message: '请再次输入密码'
      },
      {
        validate: (value) => value === formData.password,
        message: '密码不匹配'
      }
    ]
  }
  const { formData, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    initialFormData,
    validationRules
  )

  // 表单提交
  async function handleCommit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    const errors = validateAll()
    const errorKeys = Object.keys(errors)

    const noErrors = errorKeys.length === 0
    if (noErrors) {
      const { name, password } = formData
      const res = await signup(name, password, registeringPhone!)

      // 注册失败
      const codeError = res?.code !== 200
      if (codeError) {
        Message.error(res!.msg)
        return
      }

      // 存储token并返回上层目录
      Message.success(`注册成功！欢迎您——${res.data.name}！`)
      localStorage.setItem(TOKEN, res.data.token)
      router.back()
      router.refresh()
    } else {
      Message.error(errors[errorKeys[0]])
    }
  }

  return (
    <div className="register-page">
      <Modal
        handleClose={() => router.back()}
        title="创建您的账号"
        subTitle={registeringPhone && `你好啊，${encryptPhone(registeringPhone)}`}
      >
        <form className="signup-form">
          <div className="form-name mb-5">
            <AuthInput
              placeholder="用户名"
              handleChange={handleChange}
              handleBlur={handleBlur}
              name="name"
            />
            {errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div className="form-password mb-5">
            <div className="input-wrap relative">
              <AuthInput
                placeholder="密码"
                handleChange={handleChange}
                handleBlur={handleBlur}
                type={isShowPwd ? 'text' : 'password'}
                name="password"
              />
              <i
                className={`iconfont ${
                  isShowPwd ? 'icon-eyeclose' : 'icon-eye'
                } absolute inset-y-0 right-0 my-auto w-11 h-full text-center leading-10 cursor-pointer`}
                onClick={() => setIsShowPwd((preVal) => !preVal)}
              />
            </div>
            {errors.password && <ErrorMessage text={errors.password} />}
          </div>

          <div className="form-repassword mb-5">
            <div className="input-wrap relative">
              <AuthInput
                placeholder="再次输入密码"
                handleChange={handleChange}
                handleBlur={handleBlur}
                type={isShowPwd ? 'text' : 'password'}
                name="rePassword"
              />
              <i
                className={`iconfont ${
                  isShowPwd ? 'icon-eyeclose' : 'icon-eye'
                } absolute inset-y-0 right-0 my-auto w-11 h-full text-center leading-10 cursor-pointer`}
                onClick={() => setIsShowPwd((preVal) => !preVal)}
              />
            </div>
            {errors.rePassword && <ErrorMessage text={errors.rePassword} />}
          </div>

          <div className="form-commit">
            <button
              className="w-full h-11 rounded-md bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors"
              onClick={handleCommit}
            >
              创建账户
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
})

export default RegisterPage
RegisterPage.displayName = 'RegisterPage'
