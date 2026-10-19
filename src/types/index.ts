export type EntityId = number | string
export type TransactionType = 'income' | 'expense'

export interface Category {
  id: EntityId
  name: string
  type: TransactionType
  icon: string
  color: string
  created_at?: string
}

export interface CategoryInput {
  name: string
  type: TransactionType
  icon?: string
  color?: string
}

export interface CategoryFormValue extends CategoryInput {
  icon: string
  color: string
  id?: EntityId
}

export interface ApiCategory {
  id: EntityId
  name: string
  type: TransactionType
  icon?: string
  color?: string
  created_at?: string
}

export interface Transaction {
  id: EntityId
  description: string
  type: TransactionType
  category: string
  category_id: EntityId
  amount: number
  date: string
  note: string
}

export interface TransactionInput {
  description: string
  type: TransactionType
  category: string
  amount: number
  date: string
  note: string
}

export type TransactionFormValue = Omit<TransactionInput, 'amount'> & {
  amount: number | ''
  id?: EntityId
  category_id?: EntityId
}

export interface ApiTransaction {
  id: EntityId
  title: string
  amount: number
  type: TransactionType
  category_id: EntityId
  transaction_date: string
  description?: string | null
  category_name?: string
  created_at?: string
  updated_at?: string
}

export interface CashflowItem {
  date: string
  income: number
  expense: number
}

export interface ExpenseCategory {
  name: string
  amount: number
  transactionCount: number
}

export interface DashboardSummary {
  income: number
  expense: number
  balance: number
  transactionCount: number
}

export interface TransactionFilters {
  search: string
  type: TransactionType | ''
  category: string
}

export interface TableColumn {
  key: string
  label: string
}

export interface SelectOption {
  value: string | number
  label: string
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.'
}
