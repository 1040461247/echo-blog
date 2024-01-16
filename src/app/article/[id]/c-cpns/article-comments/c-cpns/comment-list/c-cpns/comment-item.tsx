import { IComment } from '@/service/modules/article.request'
import formatDate from '@/utils/format-date'
import Avatar from 'boring-avatars'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'

// Types
export interface IProps {
  children?: React.ReactElement | false
  comment: IComment
  replyName?: string
}

const CommentItem: FC<IProps> = memo(({ children, comment, replyName }) => {
  return (
    <div className="comment-item group flex p-2" id={comment.user.name}>
      <div className="item-avatar mr-3">
        <div className="rounded-2xl overflow-hidden">
          {comment.user.avatar_url ? (
            <Image src={comment.user.avatar_url} width={52} height={52} alt="avatar" />
          ) : (
            <Avatar
              size={52}
              name={comment.user.name}
              variant="beam"
              colors={['#FF85A0', '#FB8351', '#FFAD64', '#E9E2DA', '#ADD4D3']}
              square
            />
          )}
        </div>
      </div>

      <div className="item-info w-full border-b border-dashed border-gray-600/50 group-last:border-none">
        <div className="acpi-user leading-normal">
          <span className="mr-2 text-sm text-gray-300">{comment.user.name}</span>
          <span className="text-xs text-gray-400">
            {formatDate(comment.create_time, 'YYYY-MM-DD')}
          </span>
        </div>

        <div className="acpi-system flex items-center gap-1 text-[10px] text-gray-500 leading-normal">
          <span className="bg-white/5 py-[2px] px-1">{comment.user.ip_address}</span>
          <span className="bg-white/5 py-[2px] px-1">{comment.user.browser_info}</span>
          <span className="bg-white/5 py-[2px] px-1">{comment.user.os_info}</span>
        </div>

        <div className="item-content pt-2 mb-3 text-sm text-gray-400 leading-loose">
          {replyName && (
            <Link
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mr-1 text-[--primary-color]"
            >
              @{replyName}
            </Link>
          )}
          <p className="inline-block">{comment.content}</p>
        </div>

        {children}
      </div>
    </div>
  )
})

export default CommentItem
CommentItem.displayName = 'CommentItem'
