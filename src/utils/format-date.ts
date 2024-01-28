import dayjs from 'dayjs'

function formatDate(date: string | number, formatStr = 'YYYY-MM-DD ') {
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

export default formatDate
