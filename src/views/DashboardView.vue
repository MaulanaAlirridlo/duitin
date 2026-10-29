<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SummaryCard from '../components/dashboard/SummaryCard.vue'
import CashflowChart from '../components/dashboard/CashflowChart.vue'
import ExpenseCategoryChart from '../components/dashboard/ExpenseCategoryChart.vue'
import RecentTransactions from '../components/dashboard/RecentTransactions.vue'
import ErrorMessage from '../components/common/ErrorMessage.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import { useCategories } from '../composables/useCategories'
import { getCashflow, getDashboardSummary, getExpensesByCategory, getRecentTransactions } from '../services/dashboardService'
import { authState } from '../services/authSession'
import type { CashflowItem, DashboardSummary, ExpenseCategory, Transaction } from '../types'
import { getErrorMessage } from '../types'

const { categories, loadCategories } = useCategories()
const summary = ref<DashboardSummary>({ income: 0, expense: 0, balance: 0, transactionCount: 0 })
const cashflow = ref<CashflowItem[]>([])
const expenses = ref<ExpenseCategory[]>([])
const transactions = ref<Transaction[]>([])
const loading = ref(true)
const error = ref('')
const currency = (value: number) => `Rp ${Number(value).toLocaleString('id-ID')}`
const monthLabel = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date())

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    await loadCategories()
    const [summaryData, cashflowData, expensesData, recentData] = await Promise.all([
      getDashboardSummary(),
      getCashflow(),
      getExpensesByCategory(),
      getRecentTransactions(categories.value),
    ])
    summary.value = summaryData
    cashflow.value = cashflowData
    expenses.value = expensesData
    transactions.value = recentData
  } catch (cause) {
    error.value = getErrorMessage(cause)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="dashboard-page">
    <div class="page-heading"><div><span class="eyebrow">RINGKASAN KEUANGAN</span><h1>Selamat datang kembali, {{ authState.user?.name || 'Pengguna' }} <span>👋</span></h1><p>Ini ringkasan keuanganmu untuk bulan {{ monthLabel }}.</p></div><RouterLink class="button button--primary" to="/transaksi"><span>＋</span> Tambah transaksi</RouterLink></div>
    <ErrorMessage v-if="error" :message="error" />
    <div v-if="loading" class="loading-state"><LoadingSpinner /><span>Mengambil data keuangan...</span></div>
    <template v-else>
    <section class="summary-grid">
      <SummaryCard label="Total saldo bulan ini" :value="currency(summary.balance)" icon="◈" tone="blue" caption="Pemasukan dikurangi pengeluaran" />
      <SummaryCard label="Total pemasukan" :value="currency(summary.income)" icon="↙" tone="green" caption="Bulan ini" />
      <SummaryCard label="Total pengeluaran" :value="currency(summary.expense)" icon="↗" tone="orange" caption="Bulan ini" />
      <SummaryCard label="Total transaksi" :value="summary.transactionCount.toLocaleString('id-ID')" icon="◷" tone="purple" caption="Pemasukan dan pengeluaran" />
    </section>
    <section class="dashboard-charts"><CashflowChart :cashflow="cashflow" /><ExpenseCategoryChart :expenses="expenses" /></section>
    <RecentTransactions :transactions="transactions" />
    </template>
  </div>
</template>
