import { reactive } from 'vue'
import type { User } from '../types'

const tokenStorageKey = 'duitin.auth.token'

export const authState = reactive({
  token: typeof window === 'undefined' ? null : window.localStorage.getItem(tokenStorageKey),
  user: null as User | null,
})

export function saveAuthSession(token: string, user: User): void {
  window.localStorage.setItem(tokenStorageKey, token)
  authState.token = token
  authState.user = user
}

export function clearAuthSession(): void {
  window.localStorage.removeItem(tokenStorageKey)
  authState.token = null
  authState.user = null
}
