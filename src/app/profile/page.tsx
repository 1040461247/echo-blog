'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import ProfileAvatar from './c-cpns/profile-avatar'
import encryptPhone from '@/utils/encrypt-phone'
import useFormValidation, { IValidationRule } from '@/hooks/use-form-validation'
import { REG_NAME_CHARACTER, REG_NAME_LENGTH } from '@/constants'
import ErrorMessage from '@/components/modal/c-cpns/error-message'
import { updateUserInfo, uploadAvatar } from '@/service/modules/user.request'
import Message from '@/components/message'
import { fetchUserInfoAction } from '@/store/slices'

// Types
export interface IProps {}

const ProfilePage: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()

  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(fetchUserInfoAction())
  }, [])

  // 表单初始化及验证规则配置
  const initialFormData = { name: userInfo?.name }
  const validationRules: Record<keyof typeof initialFormData, IValidationRule[]> = {
    name: [
      {
        validate: (value) => !!value,
        message: '用户名不能为空',
      },
      {
        validate: (value) => REG_NAME_LENGTH.test(value),
        message: '请输入3~20个字符',
      },
      {
        validate: (value) => REG_NAME_CHARACTER.test(value),
        message: '支持数字、字母、下划线',
      },
    ],
  }
  const { formData, errors, handleReset, handleChange, handleBlur } = useFormValidation(
    initialFormData,
    validationRules,
  )

  // 用户头像上传和预览
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>('')

  // Handles
  function handleResetClick() {
    setPreviewUrl(null)
    setSelectedAvatar(null)
    handleReset()
    Message.info('修改已重置')
  }
  async function handleSubmit() {
    let hasError = false
    console.log('commit')
    console.log(selectedAvatar)
    // 上传头像
    if (selectedAvatar) {
      const avatarFormData = new FormData()
      avatarFormData.append('avatar', selectedAvatar)
      const uploadRes = await uploadAvatar(avatarFormData)
      if (!uploadRes.success) {
        Message.error(uploadRes.msg)
        hasError = true
      }
    }

    // 修改用户信息
    if (formData.name !== userInfo?.name) {
      const updateRes = await updateUserInfo(formData.name)
      if (updateRes.code !== 200) {
        Message.error(updateRes.msg)
        hasError = true
      }
    }

    if (selectedAvatar || formData.name !== userInfo?.name) {
      dispatch(fetchUserInfoAction())
      !hasError && Message.success('信息更新成功')
    }
  }

  return (
    <div className="profile-page sm:pt-[38px]">
      <div className="relative flex gap-8 px-10 pb-10 pt-[--ssm-modal-pt] mx-auto w-full h-full xs:w-[475px] xs:h-auto xs:p-6 rounded-2xl bg-[--bg-dark-blue-deep] text-gray-300 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="profile-avatar-wrap">
          <div className="w-[125px] h-[125px] flex items-center justify-center rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[#5c5648]">
            <ProfileAvatar
              setSelectedAvatar={setSelectedAvatar}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">点击头像修改</div>
        </div>

        <form className="profile-content flex-1 flex flex-col gap-2 pt-6 text-lg">
          <div className="profile-nickname">
            <div>
              <label className="cursor-pointer">
                <span>昵称：</span>
                <input
                  className="bg-transparent w-1/2"
                  type="text"
                  defaultValue={userInfo?.name ?? ''}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <i className="iconfont icon-pen" />
              </label>
            </div>
            {errors.name && <ErrorMessage text={errors.name} />}
          </div>

          <div className="profile-phone">
            <span>联系方式：</span>
            <span>{userInfo?.phoneNum && encryptPhone(userInfo.phoneNum)}</span>
          </div>

          <div className="profile-control absolute right-5 bottom-5">
            <button
              className="py-1 px-4 mr-2 rounded-lg border border-gray-600 text-white text-sm hover-highlight"
              type="reset"
              onClick={handleResetClick}
            >
              取消
            </button>
            <button
              className="py-1 px-4 rounded-lg border border-gray-600 text-white text-sm hover-highlight"
              type="button"
              onClick={handleSubmit}
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

export default ProfilePage
ProfilePage.displayName = 'ProfilePage'
