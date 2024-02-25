import formatName from './format-name'

export interface ITocItem {
  title: string
  level: number
  children?: ITocItem[]
  offsetTop: number
}

function addHeadOffset(obj: ITocItem) {
  const { title } = obj
  const headOffset = document.getElementById(formatName(title))?.offsetTop
  obj.offsetTop = headOffset ?? 0
}

function parseMarkdown(mdStr: string) {
  if (!mdStr) return []
  const treeList: ITocItem[] = []
  const lineList: ITocItem[] = []
  const headReg = /^(#{1,3})(.*)/gm
  const headStrList = mdStr.match(headReg)

  headStrList?.forEach((item) => {
    const headItem: ITocItem = {
      title: item.replace('# ', ''),
      level: 1,
      offsetTop: 0,
    }

    if (item.startsWith('# ')) {
      // 一级标题
      addHeadOffset(headItem)
      lineList.push({ ...headItem })
      treeList.push({ ...headItem, children: [] })
    } else if (item.startsWith('## ')) {
      // 二级标题
      headItem.title = item.replace('## ', '')
      headItem.level = 2
      addHeadOffset(headItem)
      const lastIndex = treeList.length - 1

      treeList[lastIndex].children!.push({ ...headItem, children: [] })
      lineList.push({ ...headItem })
    } else if (item.startsWith('### ')) {
      // 三级标题
      headItem.title = item.replace('### ', '')
      headItem.level = 3
      addHeadOffset(headItem)
      const lastIndex = treeList.length - 1
      const lastChildIndex = treeList[lastIndex].children!.length - 1

      treeList[lastIndex].children![lastChildIndex].children!.push({ ...headItem, children: [] })
      lineList.push({ ...headItem })
    }
  })

  return [treeList, lineList]
}

export default parseMarkdown
