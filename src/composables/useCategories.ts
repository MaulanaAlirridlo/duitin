import { ref } from 'vue'
import {
  createCategory,
  deleteCategory as removeCategory,
  getCategories,
  updateCategory as saveCategory,
} from '../services/categoryService'
import type { Category, CategoryInput, EntityId } from '../types'
import { getErrorMessage } from '../types'

const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref('')

export function useCategories() {
  async function loadCategories() {
    loading.value = true
    error.value = ''
    try {
      categories.value = await getCategories()
    } catch (cause) {
      error.value = getErrorMessage(cause)
      throw cause
    } finally {
      loading.value = false
    }
  }

  async function addCategory(category: CategoryInput): Promise<void> {
    const saved = await createCategory(category)
    categories.value = [...categories.value, saved]
  }

  async function updateCategory(category: Category): Promise<void> {
    const saved = await saveCategory(category)
    categories.value = categories.value.map((item) => String(item.id) === String(saved.id) ? saved : item)
  }

  async function deleteCategory(id: EntityId): Promise<void> {
    await removeCategory(id)
    categories.value = categories.value.filter((item) => String(item.id) !== String(id))
  }

  return { categories, loading, error, loadCategories, addCategory, updateCategory, deleteCategory }
}
