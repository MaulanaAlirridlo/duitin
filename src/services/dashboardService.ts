import { getCollection, request } from './api'
import { normalizeTransaction } from './transactionService'
import type { ApiTransaction, Category, CashflowItem, DashboardSummary, ExpenseCategory, Transaction } from '../types'

interface ApiDashboardSummary {
  income_count: number
  expense_count: number
  income: number
  expense: number
  net: number
}

interface ApiCashflowResponse {
  data: Array<{ date: string; income: number; expense: number }>
}

interface ApiExpenseCategory {
  category_name: string
  amount: number
  transaction_count: number
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const summary = await request<ApiDashboardSummary>('/dashboard/summary')
  return {
    ...summary,
    income: Number(summary.income),
    expense: Number(summary.expense),
    balance: Number(summary.net),
    transactionCount: Number(summary.income_count) + Number(summary.expense_count),
  }
}

export async function getCashflow(groupBy = 'month'): Promise<CashflowItem[]> {
  const response = await request<ApiCashflowResponse>(`/dashboard/cashflow?${new URLSearchParams({ group_by: groupBy })}`)
  if (!Array.isArray(response?.data)) {
    throw new Error('Format respons arus kas tidak valid: properti data harus berupa array.')
  }
  return response.data.map((item) => ({
    date: item.date,
    income: Number(item.income),
    expense: Number(item.expense),
  }))
}

export async function getExpensesByCategory(): Promise<ExpenseCategory[]> {
  const categories = await getCollection<ApiExpenseCategory>('/dashboard/expenses-by-category')
  return categories.map((category) => ({
    name: category.category_name,
    amount: Number(category.amount),
    transactionCount: Number(category.transaction_count),
  }))
}

export async function getRecentTransactions(categories: Category[] = []): Promise<Transaction[]> {
  const transactions = await getCollection<ApiTransaction>('/dashboard/recent-transactions', { limit: '5' })
  return transactions.map((transaction) => normalizeTransaction(transaction, categories))
}
