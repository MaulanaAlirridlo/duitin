import { request } from './api'
import { authState, clearAuthSession, saveAuthSession } from './authSession'
import type { User } from '../types'

interface Credentials {
  email: string
  password: string
}

interface RegisterInput extends Credentials {
  name: string
}

interface LoginResponse {
  token: string
  token_type: string
  expires_at: string
  user: User
}

export async function login(credentials: Credentials): Promise<void> {
  const response = await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
  if (!response?.token || !response.user) {
    throw new Error('Format respons login tidak valid.')
  }
  saveAuthSession(response.token, response.user)
}

export async function register(input: RegisterInput): Promise<void> {
  await request<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  await login({ email: input.email, password: input.password })
}

export async function loadCurrentUser(): Promise<User | null> {
  if (!authState.token) return null
  if (authState.user) return authState.user

  const user = await request<User>('/users/me')
  authState.user = user
  return user
}

export function logout(): void {
  clearAuthSession()
}
