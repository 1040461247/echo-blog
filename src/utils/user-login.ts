import { TOKEN } from '@/constants'

export default function userLogin(token: string) {
  localStorage.setItem(TOKEN, token)
}
