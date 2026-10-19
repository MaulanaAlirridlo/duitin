<script setup lang="ts">
import BaseTable from '../common/BaseTable.vue'
import EmptyState from '../common/EmptyState.vue'
import TransactionTypeBadge from './TransactionTypeBadge.vue'
import type { EntityId, TableColumn, Transaction } from '../../types'

withDefaults(defineProps<{ transactions?: Transaction[] }>(), { transactions: () => [] })
defineEmits<{
  edit: [transaction: Transaction]
  delete: [id: EntityId]
}>()
const columns: TableColumn[] = [{ key: 'description', label: 'Nama transaksi' }, { key: 'type', label: 'Tipe' }, { key: 'date', label: 'Tanggal' }, { key: 'amount', label: 'Jumlah' }, { key: 'actions', label: '' }]
const currency = (value: number) => `Rp ${Number(value).toLocaleString('id-ID')}`
const dateLabel = (date: string) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`))
</script>

<template>
  <div v-if="!transactions.length" class="panel"><EmptyState title="Transaksi tidak ditemukan" description="Coba ubah filter atau tambahkan transaksi baru." /></div>
  <div v-else class="panel transaction-table">
    <BaseTable :columns="columns" :rows="transactions">
      <template #row="{ row }">
        <td><div class="transaction-cell"><span class="transaction-cell__icon" :class="row.type === 'income' ? 'transaction-cell__icon--income' : ''">{{ row.type === 'income' ? '↙' : '↗' }}</span><span><strong>{{ row.description }}</strong><small>{{ row.category }}<template v-if="row.note"> · {{ row.note }}</template></small></span></div></td>
        <td><TransactionTypeBadge :type="row.type" /></td><td class="muted">{{ dateLabel(row.date) }}</td>
        <td class="amount-cell" :class="row.type === 'income' ? 'amount--income' : 'amount--expense'">{{ row.type === 'income' ? '+' : '−' }}{{ currency(row.amount) }}</td>
        <td><div class="row-actions"><button aria-label="Edit transaksi" @click="$emit('edit', row)">✎</button><button aria-label="Hapus transaksi" @click="$emit('delete', row.id)">⌫</button></div></td>
      </template>
    </BaseTable>
  </div>
</template>
