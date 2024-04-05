'use client'

import Message from '@/components/message'
import Modal from '@/components/modal'
import ErrorMessage from '@/components/modal/c-cpns/error-message'
import ModalInput from '@/components/modal/c-cpns/modal-input'
import useFormValidation, { IValidationRule } from '@/hooks/use-form-validation'
import { commitFriends } from '@/service/modules/friends.request'
import { memo, useState } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement
}

const AuditFriends: FC<IProps> = memo(() => {
  const [showModal, setShowModal] = useState(false)

  // 表单初始化及验证规则配置
  const initialFormData = { linkName: '', linkDesc: '', linkUrl: '', linkIcon: '' }
  const validationRules: Record<keyof typeof initialFormData, IValidationRule[]> = {
    linkName: [
      {
        validate: (value) => !!value,
        message: '网站昵称不能为空',
      },
    ],
    linkDesc: [
      {
        validate: (value) => !!value,
        message: '网站描述不能为空',
      },
    ],
    linkUrl: [
      {
        validate: (value) => !!value,
        message: '网站地址不能为空',
      },
    ],
    linkIcon: [
      {
        validate: (value) => !!value,
        message: '网站图标地址不能为空',
      },
    ],
  }
  const { formData, errors, handleChange, handleBlur, validateAll } = useFormValidation(
    initialFormData,
    validationRules,
  )

  // 提交表单
  async function handleCommit(
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent,
  ) {
    e && e.preventDefault()
    const errors = validateAll()
    const errorKeys = Object.keys(errors)
    const noErrors = errorKeys.length === 0

    if (noErrors) {
      const { linkName, linkDesc, linkUrl, linkIcon } = formData
      const res = await commitFriends(linkName, linkUrl, linkIcon, linkDesc)

      const codeError = res?.code !== 200
      if (codeError) {
        Message.error(res!.msg)
      } else {
        Message.success('申请成功，请耐心等待审核~')
      }
      setShowModal(false)
    } else {
      Message.error(errors[errorKeys[0]])
    }
  }

  return (
    <div className="audit-friends rounded-lg overflow-hidden w-1/2 mx-auto mt-10">
      <button
        className="audit-friends w-full py-3 bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors duration-300"
        onClick={() => setShowModal(true)}
        type="button"
      >
        申请友链
      </button>

      {showModal && (
        <Modal title="申请友链" handleClose={() => setShowModal(false)}>
          <form>
            <div className="form-link-name mb-5">
              <ModalInput
                name="linkName"
                placeholder="网站昵称"
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
              {errors.linkName && <ErrorMessage text={errors.linkName} />}
            </div>

            <div className="form-link-desc mb-5">
              <ModalInput
                name="linkDesc"
                placeholder="网站描述"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.linkDesc && <ErrorMessage text={errors.linkDesc} />}
            </div>

            <div className="form-link-url mb-5">
              <ModalInput
                name="linkUrl"
                placeholder="网站地址"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.linkUrl && <ErrorMessage text={errors.linkUrl} />}
            </div>

            <div className="form-link-icon mb-5">
              <ModalInput
                name="linkIcon"
                placeholder="网站图标地址"
                onChange={handleChange}
                onBlur={handleBlur}
                onEnterUp={handleCommit}
              />
              {errors.linkIcon && <ErrorMessage text={errors.linkIcon} />}
            </div>

            <div className="form-commit">
              <button
                className="w-full h-11 rounded-md bg-[--primary-color] text-white hover:bg-[--primary-color-dark] transition-colors duration-200"
                onClick={handleCommit}
                type="button"
              >
                提交申请
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
})

export default AuditFriends
AuditFriends.displayName = 'AuditFriends'
