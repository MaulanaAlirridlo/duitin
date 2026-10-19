<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseTable from '../common/BaseTable.vue'
import TransactionTypeBadge from '../transactions/TransactionTypeBadge.vue'
import type { TableColumn, Transaction } from '../../types'

withDefaults(defineProps<{ transactions?: Transaction[] }>(), { transactions: () => [] })
const columns: TableColumn[] = [{ key: 'description', label: 'Transaksi' }, { key: 'date', label: 'Tanggal' }, { key: 'amount', label: 'Jumlah' }]
const currency = (value: number) => `Rp ${Number(value).toLocaleString('id-ID')}`
const dateLabel = (date: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`))
</script>

<template>
  <section class="panel recent-panel">
    <div class="panel__heading"><div><h2>Transaksi terbaru</h2><p>Aktivitas keuangan terakhirmu</p></div><RouterLink class="text-link" to="/transaksi">Lihat semua <span>→</span></RouterLink></div>
    <BaseTable :columns="columns" :rows="transactions.slice(0, 5)">
      <template #row="{ row }">
        <td><div class="transaction-cell"><span class="transaction-cell__icon">{{ row.type === 'income' ? '↙' : '↗' }}</span><span><strong>{{ row.description }}</strong><small>{{ row.category }}</small></span></div></td>
        <td class="muted">{{ dateLabel(row.date) }}</td>
        <td class="amount-cell" :class="row.type === 'income' ? 'amount--income' : 'amount--expense'"><TransactionTypeBadge :type="row.type" />{{ row.type === 'income' ? '+' : '−' }}{{ currency(row.amount) }}</td>
      </template>
    </BaseTable>
  </section>
</template>
