import { getCollection, getResource, request } from './api'
import type { ApiTransaction, Category, EntityId, Transaction, TransactionInput } from '../types'

export function normalizeTransaction(transaction: ApiTransaction, categories: Category[] = []): Transaction {
  const category = categories.find((item) => String(item.id) === String(transaction.category_id))
  return {
    id: transaction.id,
    description: transaction.title,
    type: transaction.type,
    category: category?.name || transaction.category_name || 'Kategori dihapus',
    category_id: transaction.category_id,
    amount: Number(transaction.amount),
    date: transaction.transaction_date,
    note: transaction.description || '',
  }
}

function serializeTransaction(transaction: TransactionInput | Transaction, categories: Category[]): Omit<ApiTransaction, 'id'> {
  const category = categories.find((item) => item.name === transaction.category)
  if (!category) {
    throw new Error('Kategori transaksi tidak ditemukan. Muat ulang daftar kategori dan coba lagi.')
  }
  return {
    title: transaction.description,
    amount: Number(transaction.amount),
    type: transaction.type,
    category_id: category.id,
    transaction_date: transaction.date,
    description: transaction.note || '',
  }
}

export async function getTransactions(categories: Category[] = []): Promise<Transaction[]> {
  const transactions = await getCollection<ApiTransaction>('/transactions')
  return transactions.map((transaction) => normalizeTransaction(transaction, categories))
}

export async function getTransaction(id: EntityId, categories: Category[] = []): Promise<Transaction> {
  const transaction = getResource<ApiTransaction>(await request(`/transactions/${encodeURIComponent(id)}`), 'transaksi')
  return normalizeTransaction(transaction, categories)
}

export async function createTransaction(transaction: TransactionInput, categories: Category[]): Promise<Transaction> {
  const response = await request('/transactions', {
    method: 'POST',
    body: JSON.stringify(serializeTransaction(transaction, categories)),
  })
  return normalizeTransaction(getResource<ApiTransaction>(response, 'transaksi'), categories)
}

export async function updateTransaction(transaction: Transaction, categories: Category[]): Promise<Transaction> {
  const response = await request(`/transactions/${encodeURIComponent(transaction.id)}`, {
    method: 'PUT',
    body: JSON.stringify(serializeTransaction(transaction, categories)),
  })
  return normalizeTransaction(getResource<ApiTransaction>(response, 'transaksi'), categories)
}

export async function deleteTransaction(id: EntityId): Promise<void> {
  await request(`/transactions/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
