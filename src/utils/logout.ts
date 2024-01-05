import { TOKEN } from '@/constants'

function logout() {
  localStorage.removeItem(TOKEN)
  location.reload()
}

export default logout
