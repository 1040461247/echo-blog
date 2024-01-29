import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children: React.ReactElement
}

const ProfileCard: FC<IProps> = memo(({ children }) => {
  return (
    <div className="profile-card overflow-hidden rounded-lg">
      <div className="inline-block align-top border border-black/5 w-[350px] h-40 xs:w-[400px] xs:h-[200px] sm:w-[450px] sm:h-[240px] md:w-[500px] md:h-[280px] lg:w-[600px] lg:h-[320px]">
        {children}
      </div>
    </div>
  )
})

export default ProfileCard
ProfileCard.displayName = 'ProfileCard'
