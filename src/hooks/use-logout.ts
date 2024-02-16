import { TOKEN } from '@/constants'
import { useAppDispatch } from './use-store'
import { clearUserInfoAction } from '@/store/slices'
import { logout } from '@/service/modules/user.request'

export default function useLogout() {
  const dispatch = useAppDispatch()

  return async () => {
    await logout()
    dispatch(clearUserInfoAction())
    localStorage.removeItem(TOKEN)
  }
}
