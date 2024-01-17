import { TOKEN } from '@/constants'

export default function getAuthHeader() {
  const token = localStorage.getItem(TOKEN)
  if (!token) return

  return { Authorization: token }
}
