import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import PaginationBtn from '../pagination-btn'

// Types
export interface IProps {
  children?: React.ReactElement
  pageCount: number
  onChange: (page: number) => void
  curPage: number
}

const PaginationPager: FC<IProps> = memo(({ pageCount, onChange, curPage }) => {
  const [pageArr, setPageArr] = useState<number[]>([])

  useEffect(() => {
    setPageArr(Array.from({ length: pageCount }, (_, index) => index + 1))
  }, [pageCount])

  return (
    <div className="pagination-pager">
      {pageArr.map((pageNum) => (
        <PaginationBtn
          text={pageNum}
          onHandle={() => onChange(pageNum)}
          isActive={curPage === pageNum}
          key={pageNum}
        />
      ))}
    </div>
  )
})

export default PaginationPager
PaginationPager.displayName = 'PaginationPager'
