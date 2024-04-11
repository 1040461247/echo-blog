import formatName from './format-name'

export interface ITocItem {
  title: string
  level: number
  children?: ITocItem[]
  offsetTop: number
}

// 获取对应标题的滚动位置
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

      // 当二级标签有父标签时，加入父标签的children，否则与以及一级标签平行
      const children = treeList[lastIndex]?.children
      if (children) {
        children.push({ ...headItem, children: [] })
      } else {
        treeList.push({ ...headItem, children: [] })
      }
      lineList.push({ ...headItem })
    } else if (item.startsWith('###')) {
      // 其余全部处理为三级标题
      headItem.title = item.replace('### ', '')
      headItem.level = 3
      addHeadOffset(headItem)
      const lastIndex = treeList.length - 1

      const children = treeList[lastIndex]?.children
      if (children) {
        const lastChildIndex = children.length - 1
        const subChildren = children[lastChildIndex].children
        if (subChildren) {
          subChildren.push({ ...headItem, children: [] })
        } else {
          children.push({ ...headItem, children: [] })
        }
      } else {
        treeList.push({ ...headItem, children: [] })
      }

      lineList.push({ ...headItem })
    }
  })

  return [treeList, lineList]
}

export default parseMarkdown
