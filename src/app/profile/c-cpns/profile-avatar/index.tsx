import UserAvatar from '@/components/user-avatar'
import { useAppSelector } from '@/hooks/use-store'
import Image from 'next/image'
import { memo } from 'react'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'

// Types
export interface IProps {
  children?: React.ReactElement
  setSelectedAvatar: (arg: File | null) => void
  previewUrl: string | ArrayBuffer | null
  setPreviewUrl: (arg: string | ArrayBuffer | null) => void
}

const ProfileAvatar: FC<IProps> = memo(({ setSelectedAvatar, previewUrl, setPreviewUrl }) => {
  const { userInfo } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo,
    }),
    shallowEqual,
  )

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
        (file)
    }
  }

  return (
    <header className="profile-avatar relative overflow-hidden w-28 h-28 rounded-full">
      <div className="avatar-show absolute inset-0">
        {previewUrl ? (
          <div className="relative w-full h-full">
            <Image
              className="object-cover"
              src={previewUrl as string}
              fill
              sizes="224px"
              alt="preview-avatar"
            />
          </div>
        ) : (
          <UserAvatar avatarUrl={userInfo?.avatarUrl} userId={userInfo?.id} size={112} />
        )}
      </div>
      <div className="avatar-selector">
        <label
          className="opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center bg-black/50 cursor-pointer transition-opacity duration-200"
          htmlFor="avatar-upload"
        >
          <span className="text-white">选择头像</span>
        </label>
        <input
          className="opacity-0"
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>
    </header>
  )
})

export default ProfileAvatar
ProfileAvatar.displayName = 'ProfileAvatar'
