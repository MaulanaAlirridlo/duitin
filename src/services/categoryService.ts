import { getCollection, getResource, request } from './api'
import type { ApiCategory, Category, CategoryInput, EntityId, TransactionType } from '../types'

const categoryIcons: Record<TransactionType, string> = { expense: '📦', income: '💰' }
const categoryColors: Record<TransactionType, string> = { expense: '#f59e0b', income: '#10b981' }

export function normalizeCategory(category: ApiCategory): Category {
  return {
    ...category,
    icon: category.icon || categoryIcons[category.type] || '◈',
    color: category.color || categoryColors[category.type] || '#64748b',
  }
}

export async function getCategories(): Promise<Category[]> {
  const categories = await getCollection<ApiCategory>('/categories')
  return categories.map(normalizeCategory)
}

export async function getCategory(id: EntityId): Promise<Category> {
  return normalizeCategory(getResource<ApiCategory>(await request(`/categories/${encodeURIComponent(id)}`), 'kategori'))
}

export async function createCategory(category: CategoryInput): Promise<Category> {
  const response = await request('/categories', {
    method: 'POST',
    body: JSON.stringify({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
    }),
  })
  return normalizeCategory(getResource<ApiCategory>(response, 'kategori'))
}

export async function updateCategory(category: Category): Promise<Category> {
  const response = await request(`/categories/${encodeURIComponent(category.id)}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
    }),
  })
  return normalizeCategory(getResource<ApiCategory>(response, 'kategori'))
}

export async function deleteCategory(id: EntityId): Promise<void> {
  await request(`/categories/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
