import dayjs from 'dayjs'

export default function formatDate(date: string | number, formatStr = 'YYYY-MM-DD ') {
  const now = dayjs()
  const targetDate = dayjs(Date.parse(String(date)))

  const diffSeconds = now.diff(targetDate, 'second')
  const diffMinute = now.diff(targetDate, 'minute')
  const diffHoure = now.diff(targetDate, 'hours')
  const diffDay = now.diff(targetDate, 'day')

  if (diffSeconds < 60) {
    return `${diffSeconds < 0 ? 1 : diffSeconds}秒前`
  } else if (diffMinute < 60) {
    return `${diffMinute}分钟前`
  } else if (diffHoure < 24) {
    return `${diffHoure}小时前`
  } else if (diffDay <= 3) {
    return `${diffDay}天前`
  } else {
    return targetDate.format(formatStr)
  }
}

export function formatDiff(seconds: number) {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return { days, hours, minutes, remainingSeconds }
}
