'use client'

import parseMarkdown from '@/utils/parse-md'
import { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { ITocItem } from '@/utils/parse-md'
import formatName from '@/utils/format-name'
import throttle from '@/utils/throttle'
import { useAppSelector } from '@/hooks/use-store'

// Types
export interface IProps {
  children?: React.ReactElement
  articleContent: string
}

const ArticleAside: FC<IProps> = memo(({ articleContent }) => {
  // head信息
  const [curTitleId, setCurTitleId] = useState('')

  const [[treeList, lineList], setHeadList] = useState<ITocItem[][]>([])
  useEffect(() => {
    if (articleContent) {
      setHeadList(parseMarkdown(articleContent))
    }
  }, [articleContent])

  // 监听滚动，获取当前阅读的标题
  useEffect(() => {
    if (!lineList) return
    let curTitleIdTemp = ''
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop
      for (const headItem of lineList) {
        if (scrollTop >= headItem.offsetTop) {
          curTitleIdTemp = headItem.id
        } else {
          curTitleIdTemp !== curTitleId && setCurTitleId(curTitleIdTemp)
          break
        }
      }
      // 在文章末尾时，最后一个标题高亮
      if (curTitleIdTemp === lineList[lineList.length - 1]?.id && curTitleIdTemp !== curTitleId) {
        setCurTitleId(curTitleIdTemp)
      }
    }
    addEventListener('scroll', handleScroll)
    return () => removeEventListener('scroll', throttle(handleScroll, 500))
  }, [lineList, curTitleId])

  function handleTocClick(tocItem: ITocItem, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault()
    setCurTitleId(tocItem.id)
    scrollTo({
      top: tocItem.offsetTop,
    })
  }

  function showToc(tocList: ITocItem[]) {
    if (!tocList) return
    const olLevel = tocList[0]?.level

    return (
      <ol className={`toc-wrap `}>
        {tocList?.map((item) => (
          <li
            className={`relative pl-3 text-gray-300 ${
              olLevel === 1 ? '' : 'border-l-2 border-dotted border-gray-500'
            }`}
            key={item.id}
          >
            <a
              className={`${formatName(item.title)} ${
                curTitleId === item.id ? 'text-[--primary-color] font-bold' : ''
              } leading-7 ellipsis-1-line transition-colors duration-300`}
              href={`#${formatName(item.title)}`}
              onClick={(e) => handleTocClick(item, e)}
            >
              <span
                className={`absolute left-[-2px] opacity-0 w-[2px] h-7 bg-[--primary-color] transition-opacity duration-300 ${
                  curTitleId === item.id ? 'opacity-100' : ''
                }`}
              ></span>
              {item.title}
            </a>
            {item.children!.length > 0 && showToc(item.children!)}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <aside className="article-aside hidden md:block sticky top-[108px] w-[205px] p-[10px]">
      <div className="article-aside-title pb-3 mb-3 text-xl text-gray-300 border-b">目录</div>
      <div className="toc-wrap">{showToc(treeList)}</div>
    </aside>
  )
})

export default ArticleAside
ArticleAside.displayName = 'ArticleAside'
