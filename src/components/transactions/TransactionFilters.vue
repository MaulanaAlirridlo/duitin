<script setup lang="ts">
import BaseSelect from '../common/BaseSelect.vue'
import type { Category, TransactionFilters as FilterState } from '../../types'

const props = withDefaults(defineProps<{
  filters: FilterState
  categories?: Category[]
}>(), { categories: () => [] })
const emit = defineEmits<{
  'update:filters': [filters: FilterState]
  reset: []
}>()

function updateType(type: string): void {
  if (type === '' || type === 'income' || type === 'expense') {
    emit('update:filters', { ...props.filters, type })
  }
}

function updateCategory(category: string): void {
  emit('update:filters', { ...props.filters, category })
}

function updateSearch(event: Event): void {
  const target = event.target
  if (target instanceof HTMLInputElement) emit('update:filters', { ...props.filters, search: target.value })
}
</script>

<template>
  <div class="filters">
    <label class="field filters__search"><span class="field__label">Cari transaksi</span><input class="input" :value="filters.search" placeholder="Cari nama transaksi..." @input="updateSearch"></label>
    <BaseSelect label="Tipe" :model-value="filters.type" @update:model-value="updateType"><option value="">Semua tipe</option><option value="income">Pemasukan</option><option value="expense">Pengeluaran</option></BaseSelect>
    <BaseSelect label="Kategori" :model-value="filters.category" @update:model-value="updateCategory"><option value="">Semua kategori</option><option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option></BaseSelect>
    <button class="filter-reset" @click="$emit('reset')">Reset filter</button>
  </div>
</template>
