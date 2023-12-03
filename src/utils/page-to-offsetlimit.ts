interface OffsetLimit {
  offset: number
  limit: number
}

function pageToOffsetLimit(page: number, itemsPerPage = 10): OffsetLimit {
  // 确保页面数不小于1
  page = Math.max(1, page)

  // 计算偏移和限制值
  const offset: number = (page - 1) * itemsPerPage
  const limit: number = itemsPerPage

  return { offset, limit }
}

export default pageToOffsetLimit
