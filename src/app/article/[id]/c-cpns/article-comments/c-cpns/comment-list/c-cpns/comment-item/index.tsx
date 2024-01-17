import { IComment, delComment } from '@/service/modules/article.request'
import formatDate from '@/utils/format-date'
import Avatar from 'boring-avatars'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import type { FC } from 'react'
import CommentItemSystemTag from '../comment-item-system-tag'
import CommentPanel from '../../../comment-panel'
import { useAppDispatch, useAppSelector } from '@/hooks/use-store'
import { shallowEqual } from 'react-redux'
import Message from '@/components/message'
import { fetchCommentsByArticleIdAction } from '@/store/slices'

// Types
export interface IProps {
  children?: React.ReactElement | false
  comment: IComment
  replyName?: string
  setCurReplyId: (id: number) => void
  curReplyId: number
}

const CommentItem: FC<IProps> = memo(
  ({ children, comment, replyName, setCurReplyId, curReplyId }) => {
    const dispatch = useAppDispatch()

    const { article, userInfo } = useAppSelector(
      (state) => ({
        article: state.article.article,
        userInfo: state.user.userInfo
      }),
      shallowEqual
    )

    // getIcon
    function getBroserIcon(browserInfo: string) {
      const browserInfoLow = browserInfo.toLowerCase()
      const browserIcons = ['safari', 'chrome', 'firefox', 'edge']
      for (const browserIcon of browserIcons) {
        if (browserInfoLow.includes(browserIcon)) {
          return 'icon-' + browserIcon
        }
      }
      return 'icon-browser'
    }

    function getOsIcon(osInfo: string) {
      const osInfoLow = osInfo.toLowerCase()
      const osIcons = ['android', 'ios', 'mac', 'windows']
      for (const osIcon of osIcons) {
        if (osInfoLow.includes(osIcon)) {
          return 'icon-' + (osIcon === 'ios' || osIcon === 'mac' ? 'apple' : osIcon)
        }
      }
      return 'icon-os'
    }

    // Handles
    function handleReply() {
      if (comment.id === curReplyId) return setCurReplyId(-1)
      setCurReplyId(comment.id)
    }

    async function handleDelete() {
      const isConfirm = confirm('是否删除评论？')
      if (isConfirm) {
        const res = await delComment(comment.id)
        if (res.code === 200) {
          Message.success('删除成功')
          dispatch(fetchCommentsByArticleIdAction(article.id))
        } else {
          Message.error(res.msg)
        }
      } else {
        Message.info('取消删除')
      }
    }

    return (
      <div className="comment-item group flex p-2 pr-0" id={comment.user.name}>
        {/* 头像 */}
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

        {/* 评论信息 */}
        <div className="item-info w-full border-b border-dashed border-gray-600/50 group-last:border-none">
          <div className="acpi-top flex justify-between">
            <div className="acpi-top-left flex items-center gap-2 mb-1 leading-normal">
              <span className="text-sm text-gray-300">{comment.user.name}</span>
              {article?.author.id === comment.user.id && (
                <span className="px-1 py-[2px] border border-[#3498db] rounded-[4px] text-xs text-[#3498db] whitespace-nowrap">
                  博主
                </span>
              )}
              <span className="text-xs text-gray-400">
                {formatDate(comment.create_time, 'YYYY-MM-DD')}
              </span>
            </div>

            <div className="acpi-top-right flex items-center">
              <span className="thumbsup mr-2 hover-highlight cursor-pointer" title="点赞">
                <i className="iconfont icon-heart text-xl" />
              </span>
              <span
                className={`comment-icon mr-2 hover-highlight cursor-pointer ${
                  curReplyId === comment.id ? 'text-[--primary-color]' : ''
                }`}
                onClick={handleReply}
                title="评论"
              >
                <i className="iconfont icon-comment text-xl" />
              </span>
              {userInfo?.id === comment.user.id && (
                <span
                  className="delete hover-highlight cursor-pointer"
                  onClick={handleDelete}
                  title="删除评论"
                >
                  <i className="iconfont icon-delete text-xl" />
                </span>
              )}
            </div>
          </div>

          {/* 用户系统信息 */}
          <div className="acpi-system flex items-center gap-1 text-[10px] text-gray-500 leading-normal">
            <CommentItemSystemTag iconName="icon-position" info={comment.user.ip_address} />
            <CommentItemSystemTag
              iconName={getBroserIcon(comment.user.browser_info)}
              info={comment.user.browser_info}
            />
            <CommentItemSystemTag
              iconName={getOsIcon(comment.user.os_info)}
              info={comment.user.os_info}
            />
          </div>

          {/* 评论内容 */}
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

          {/* 回复框 */}
          {curReplyId === comment.id && (
            <CommentPanel handleClose={() => setCurReplyId(-1)} replyCommentId={comment.id} />
          )}

          {children}
        </div>
      </div>
    )
  }
)

export default CommentItem
CommentItem.displayName = 'CommentItem'
