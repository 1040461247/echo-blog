import { TOKEN } from '@/constants'
import { useAppDispatch } from './use-store'
import { fetchVerifyAuthAction } from '@/store/slices'

export function useLogin() {
  const dispatch = useAppDispatch()

  return (token: string) => {
    localStorage.setItem(TOKEN, token)
    dispatch(fetchVerifyAuthAction())
  }
}
