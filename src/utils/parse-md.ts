import formatName from './format-name'
import uuid from './uuid'

export interface ITocItem {
  title: string
  level: number
  children?: ITocItem[]
  offsetTop: number
  id: string
}

// 获取对应标题的滚动位置
function getHeadOffset(title: string, samePreCount?: number) {
  const titleId = samePreCount ? `${formatName(title)}-${samePreCount}` : formatName(title)
  const headOffset = document.getElementById(titleId)?.offsetTop
  return headOffset ?? 0
}

// 找到上一级父节点
function findParent(treeList: ITocItem[], currentLevel: number) {
  const lastSubTree = treeList[treeList.length - 1]
  let parentObj: ITocItem = lastSubTree

  function seek(treeItem?: ITocItem) {
    if (!treeItem || treeItem.level >= currentLevel) return
    parentObj = treeItem
    const children = treeItem.children
    seek(children?.[children.length - 1])
  }
  seek(treeList[treeList.length - 1])

  return parentObj
}

// 解析标题
function parseMarkdown(mdStr: string) {
  if (!mdStr) return []
  const treeList: ITocItem[] = []
  const lineList: ITocItem[] = []
  const headStrList = mdStr.match(/^(#{1,3})(.*)/gm)
  const sameTitleMap: Record<string, number> = {}

  headStrList?.forEach((item, index) => {
    const level = item.match(/^#+/g)![0].length
    const title = formatName(item.replace(`${'#'.repeat(level)} `, ''))
    const offsetTop = getHeadOffset(title, sameTitleMap[item])
    const id = uuid()
    const headItem: ITocItem = { level, title, offsetTop, id }

    if (index === 0 && level !== 1) {
      // 处理非一级标题开头的情况
      treeList.push({ ...headItem, children: [] })
      return
    } else if (level === 1) {
      treeList.push({ ...headItem, children: [] })
    } else {
      const parent = findParent(treeList, level)
      parent.children?.push({ ...headItem, children: [] })
    }

    lineList.push({ ...headItem })
    sameTitleMap[item] = (sameTitleMap[item] ?? 0) + 1
  })

  return [treeList, lineList]
}

export default parseMarkdown
