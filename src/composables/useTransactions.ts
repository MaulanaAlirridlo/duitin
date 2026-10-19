import { computed, ref } from 'vue'
import {
  createTransaction,
  deleteTransaction as removeTransaction,
  getTransaction,
  getTransactions,
  updateTransaction as saveTransaction,
} from '../services/transactionService'
import type { Category, EntityId, Transaction, TransactionInput } from '../types'
import { getErrorMessage } from '../types'

const transactions = ref<Transaction[]>([])
const loading = ref(false)
const error = ref('')

export function useTransactions() {
  const sortedTransactions = computed(() => [...transactions.value].sort((a, b) => b.date.localeCompare(a.date)))

  async function loadTransactions(categories: Category[]): Promise<void> {
    loading.value = true
    error.value = ''
    try {
      transactions.value = await getTransactions(categories)
    } catch (cause) {
      error.value = getErrorMessage(cause)
      throw cause
    } finally {
      loading.value = false
    }
  }

  async function loadTransaction(id: EntityId, categories: Category[]): Promise<Transaction> {
    return getTransaction(id, categories)
  }

  async function addTransaction(transaction: TransactionInput, categories: Category[]): Promise<void> {
    const saved = await createTransaction(transaction, categories)
    transactions.value = [saved, ...transactions.value]
  }

  async function updateTransaction(transaction: Transaction, categories: Category[]): Promise<void> {
    const saved = await saveTransaction(transaction, categories)
    transactions.value = transactions.value.map((item) => String(item.id) === String(saved.id) ? saved : item)
  }

  async function deleteTransaction(id: EntityId): Promise<void> {
    await removeTransaction(id)
    transactions.value = transactions.value.filter((item) => String(item.id) !== String(id))
  }

  return { transactions: sortedTransactions, loading, error, loadTransactions, loadTransaction, addTransaction, updateTransaction, deleteTransaction }
}
