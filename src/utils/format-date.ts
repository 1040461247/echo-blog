import dayjs from 'dayjs'

function formatDate(date: string | number, formatStr = 'YYYY-MM-DD ') {
  return dayjs(date).format(formatStr)
}

export default formatDate
