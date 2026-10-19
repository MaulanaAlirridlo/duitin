<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategories } from '../composables/useCategories'
import { useTransactions } from '../composables/useTransactions'
import BaseButton from '../components/common/BaseButton.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import CategoryList from '../components/categories/CategoryList.vue'
import CategoryForm from '../components/categories/CategoryForm.vue'
import { getCategory } from '../services/categoryService'
import type { Category, CategoryFormValue, EntityId } from '../types'
import { getErrorMessage } from '../types'

const { categories, loading, loadCategories, addCategory, updateCategory, deleteCategory } = useCategories()
const { transactions, loadTransactions } = useTransactions()
const showForm = ref(false)
const editing = ref<Category | null>(null)
const error = ref('')

onMounted(async () => {
  try {
    await loadCategories()
    await loadTransactions(categories.value)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
})

async function editCategory(category: Category): Promise<void> {
  error.value = ''
  try {
    editing.value = await getCategory(category.id)
    showForm.value = true
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}

async function save(category: CategoryFormValue): Promise<void> {
  error.value = ''
  try {
    if (editing.value && category.id !== undefined) {
      await updateCategory({ ...category, id: category.id })
    } else {
      await addCategory(category)
    }
    showForm.value = false
    editing.value = null
    await loadTransactions(categories.value)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}
async function remove(id: EntityId): Promise<void> {
  const category = categories.value.find((item) => item.id === id)
  if (transactions.value.some((item) => item.category === category?.name)) {
    window.alert('Kategori ini masih digunakan oleh transaksi. Ubah transaksi terkait sebelum menghapus kategori.')
    return
  }
  if (!window.confirm('Hapus kategori ini?')) return
  error.value = ''
  try {
    await deleteCategory(id)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}
</script>

<template>
  <div class="categories-page">
    <div class="page-heading"><div><span class="eyebrow">PENGELOLAAN</span><h1>Kategori</h1><p>Atur kategori agar pencatatanmu tetap rapi.</p></div><BaseButton @click="showForm = true"><span>＋</span> Tambah kategori</BaseButton></div>
    <ErrorMessage v-if="error" :message="error" />
    <div v-if="loading" class="loading-state"><LoadingSpinner /><span>Mengambil kategori...</span></div>
    <section v-else class="panel categories-panel"><div class="panel__heading"><div><h2>Semua kategori</h2><p>{{ categories.length }} kategori tersedia</p></div></div><CategoryList :categories="categories" @edit="editCategory" @delete="remove" /></section>
    <CategoryForm v-if="showForm" :category="editing" @save="save" @close="showForm = false; editing = null" />
  </div>
</template>
