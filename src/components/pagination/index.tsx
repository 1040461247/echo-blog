'use client'

import { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import PaginationBtn from './c-cpns/pagination-btn'
import PaginationPager from './c-cpns/pagination-pager'

// Types
export interface IProps {
  children?: React.ReactElement
  total: number
  onChange: (page: number) => void
}

const Pagination: FC<IProps> = memo(({ total, onChange }) => {
  const defaultPageSize = 10
  const [curPage, setCurPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    onChange && onChange(curPage)
  }, [curPage])

  useEffect(() => {
    setPageCount(Math.ceil(total / defaultPageSize))
  }, [total])

  return (
    <div className="pagination flex justify-center items-center h-8">
      <PaginationBtn
        text="<"
        onHandle={() => setCurPage((preVal) => preVal - 1)}
        disabled={curPage === 1}
      />

      <PaginationPager pageCount={pageCount} onChange={setCurPage} curPage={curPage} />

      <PaginationBtn
        text=">"
        onHandle={() => setCurPage((preVal) => preVal + 1)}
        disabled={curPage === pageCount}
      />
    </div>
  )
})

export default Pagination
Pagination.displayName = 'Pagination'
