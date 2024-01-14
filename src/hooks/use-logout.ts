import { TOKEN } from '@/constants'
import { useAppDispatch } from './use-store'
import { fetchVerifyAuthAction } from '@/store/slices'

export default function useLogout() {
  const dispatch = useAppDispatch()

  return () => {
    localStorage.removeItem(TOKEN)
    dispatch(fetchVerifyAuthAction())
  }
}
