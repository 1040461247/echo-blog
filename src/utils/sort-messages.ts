import { IMessageListItem } from '@/service/modules/message-record.request'

export default function sortMessages(messages: IMessageListItem[]) {
  const messageList = [...messages]
  messageList.sort((a, b) => Date.parse(b.createTime) - Date.parse(a.createTime))
  return messageList
}
