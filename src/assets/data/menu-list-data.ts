import {
  ARCHIVES_PATH,
  CATEGORY_PATH,
  FRIENDS_PATH,
  GITHUB_URL,
  HOME_PATH,
  MESSAGES_PATH,
  ME_PATH,
  MOOD_PATH,
  TAG_PATH
} from '@/constants'

const prefix = 'icon-'

const menuList: IMenuListItem[] = [
  {
    icon: `${prefix}home`,
    text: '首页',
    path: HOME_PATH
  },
  {
    icon: `${prefix}article`,
    text: '文章',
    children: [
      {
        icon: `${prefix}archives`,
        text: '时间轴',
        path: ARCHIVES_PATH
      },
      {
        icon: `${prefix}category`,
        text: '分类',
        path: CATEGORY_PATH
      },
      {
        icon: `${prefix}tags`,
        text: '标签',
        path: TAG_PATH
      }
    ]
  },
  {
    icon: `${prefix}mood`,
    text: '心情',
    path: MOOD_PATH
  },
  {
    icon: `${prefix}messages`,
    text: '留言',
    path: MESSAGES_PATH
  },
  {
    icon: `${prefix}about`,
    text: '关于',
    children: [
      {
        icon: `${prefix}messages`,
        text: '我',
        path: ME_PATH
      },
      {
        icon: `${prefix}friends`,
        text: '友链',
        path: FRIENDS_PATH
      },
      {
        icon: `${prefix}github`,
        text: 'github',
        path: GITHUB_URL
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
