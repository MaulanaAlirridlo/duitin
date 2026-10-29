import { authState, clearAuthSession } from './authSession'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

interface Pagination {
  total_pages?: number
}

interface CollectionResponse<T> {
  data: T[]
  pagination?: Pagination
}

export async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  let response
  try {
    const headers = new Headers(options.headers)
    headers.set('Accept', 'application/json')
    if (options.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    if (authState.token && !path.startsWith('/auth/')) {
      headers.set('Authorization', `Bearer ${authState.token}`)
    }
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    })
  } catch (error) {
    throw new Error(`Tidak dapat terhubung ke server ${API_BASE_URL}. Pastikan backend aktif di 127.0.0.1:8080.`, { cause: error })
  }

  const body = await response.text()
  let data: unknown = null
  if (body) {
    try {
      data = JSON.parse(body)
    } catch (error) {
      throw new Error(`Server mengembalikan respons yang bukan JSON (${response.status}).`, { cause: error })
    }
  }

  if (!response.ok) {
    if (response.status === 401 && authState.token && !path.startsWith('/auth/')) {
      clearAuthSession()
      window.dispatchEvent(new Event('duitin:auth-expired'))
    }
    const apiError = data && typeof data === 'object' ? data as { error?: unknown; message?: unknown } : null
    const message = typeof apiError?.error === 'string'
      ? apiError.error
      : typeof apiError?.message === 'string'
        ? apiError.message
        : `Permintaan gagal (${response.status} ${response.statusText}).`
    throw new Error(message)
  }

  return data as T
}

export async function getCollection<T>(path: string, params: Record<string, string> = {}): Promise<T[]> {
  const query = new URLSearchParams({ limit: '100', ...params })
  const results = []
  let page = 1
  let totalPages = 1

  do {
    const response = await request<CollectionResponse<T>>(`${path}?${new URLSearchParams({ ...Object.fromEntries(query), page: String(page) })}`)
    if (!Array.isArray(response?.data)) {
      throw new Error(`Format respons ${path} tidak valid: properti data harus berupa array.`)
    }
    results.push(...response.data)
    totalPages = Math.max(1, Number(response.pagination?.total_pages) || 1)
    page += 1
  } while (page <= totalPages)

  return results
}

export function getResource<T>(response: unknown, path: string): T {
  const data = response && typeof response === 'object' && 'data' in response ? response.data : undefined
  const resource = data && !Array.isArray(data) ? data : response
  if (!resource || typeof resource !== 'object') {
    throw new Error(`Server mengembalikan data ${path} dengan format yang tidak valid.`)
  }
  return resource as T
}
