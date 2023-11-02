const prefix = 'icon-'

const menuList: IMenuListItem[] = [
  {
    icon: `${prefix}home`,
    text: '首页',
    path: '/'
  },
  {
    icon: `${prefix}article`,
    text: '文章',
    children: [
      {
        icon: `${prefix}category`,
        text: '分类',
        path: '/category'
      },
      {
        icon: `${prefix}tags`,
        text: '标签',
        path: '/tags'
      },
      {
        icon: `${prefix}archives`,
        text: '时间轴',
        path: '/archives'
      }
    ]
  },
  {
    icon: `${prefix}mood`,
    text: '心情',
    path: '/mood'
  },
  {
    icon: `${prefix}messages`,
    text: '留言',
    path: '/messages'
  },
  {
    icon: `${prefix}about`,
    text: '关于',
    children: [
      {
        icon: `${prefix}messages`,
        text: '我',
        path: '/me'
      },
      {
        icon: `${prefix}github`,
        text: 'github',
        path: 'https://github.com/1040461247'
      },
      {
        icon: `${prefix}friends`,
        text: '友链',
        path: '/friends'
      }
    ]
  }
]

export default menuList

// Types
export interface IMenuListItem {
  icon: string
  text: string
  path?: string
  children?: IMenuListItem[]
}
