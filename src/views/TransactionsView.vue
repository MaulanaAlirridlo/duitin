<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTransactions } from '../composables/useTransactions'
import { useCategories } from '../composables/useCategories'
import BaseButton from '../components/common/BaseButton.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import TransactionFilters from '../components/transactions/TransactionFilters.vue'
import TransactionTable from '../components/transactions/TransactionTable.vue'
import TransactionForm from '../components/transactions/TransactionForm.vue'
import type { Category, Transaction, TransactionFormValue, TransactionFilters as FilterState } from '../types'
import { getErrorMessage } from '../types'

const { transactions, loading, loadTransactions, loadTransaction, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
const { categories, loadCategories } = useCategories()
const showForm = ref(false)
const editing = ref<Transaction | null>(null)
const error = ref('')
const filters = ref<FilterState>({ search: '', type: '', category: '' })
const filteredTransactions = computed(() => transactions.value.filter((item) => {
  const matchesSearch = `${item.description} ${item.category} ${item.note}`.toLowerCase().includes(filters.value.search.toLowerCase())
  return matchesSearch && (!filters.value.type || item.type === filters.value.type) && (!filters.value.category || item.category === filters.value.category)
}))
onMounted(async () => {
  try {
    await loadCategories()
    await loadTransactions(categories.value)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
})

async function save(transaction: TransactionFormValue): Promise<void> {
  error.value = ''
  try {
    const input = { ...transaction, amount: Number(transaction.amount) }
    if (editing.value) {
      await updateTransaction({ ...input, id: editing.value.id, category_id: editing.value.category_id }, categories.value)
    } else {
      await addTransaction(input, categories.value)
    }
    closeForm()
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}
function closeForm(): void {
  showForm.value = false
  editing.value = null
}
async function editTransaction(transaction: Transaction): Promise<void> {
  error.value = ''
  try {
    editing.value = await loadTransaction(transaction.id, categories.value)
    showForm.value = true
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}

async function confirmDelete(id: string | number): Promise<void> {
  if (!window.confirm('Hapus transaksi ini? Tindakan ini tidak dapat dibatalkan.')) return
  error.value = ''
  try {
    await deleteTransaction(id)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  }
}
</script>

<template>
  <div class="transactions-page">
    <div class="page-heading"><div><span class="eyebrow">CATATAN KEUANGAN</span><h1>Transaksi</h1><p>Kelola semua pemasukan dan pengeluaranmu.</p></div><BaseButton @click="showForm = true"><span>＋</span> Tambah transaksi</BaseButton></div>
    <ErrorMessage v-if="error" :message="error" />
    <div v-if="loading" class="loading-state"><LoadingSpinner /><span>Mengambil transaksi...</span></div>
    <template v-else>
    <section class="panel transaction-controls"><div class="panel__heading"><div><h2>Semua transaksi</h2><p>{{ filteredTransactions.length }} transaksi tercatat</p></div></div><TransactionFilters v-model:filters="filters" :categories="categories" @reset="filters = { search: '', type: '', category: '' }" /></section>
    <TransactionTable :transactions="filteredTransactions" @edit="editTransaction" @delete="confirmDelete" />
    </template>
    <TransactionForm v-if="showForm" :transaction="editing" :categories="categories" @save="save" @close="closeForm" />
  </div>
</template>
