<script setup lang="ts">
import { computed } from 'vue'
import type { ExpenseCategory } from '../../types'

const props = withDefaults(defineProps<{ expenses?: ExpenseCategory[] }>(), { expenses: () => [] })
const categories = computed(() => {
  const sum = props.expenses.reduce((total, item) => total + item.amount, 0)
  const palette = ['#5b6cf9', '#fb923c', '#36b37e', '#e879a9', '#24a8b8', '#9b7cf6']
  return props.expenses.slice(0, 5).map((item, index) => ({ ...item, color: palette[index] || '#64748b', percent: sum ? Math.round(item.amount / sum * 100) : 0 }))
})
const total = computed(() => categories.value.reduce((sum, item) => sum + item.amount, 0))
const gradient = computed(() => {
  if (!total.value) return '#edf0f5 0 100%'
  let offset = 0
  return categories.value.map((item) => {
    const start = offset
    offset += item.amount / total.value * 100
    return `${item.color} ${start}% ${offset}%`
  }).join(', ')
})
</script>

<template>
  <section class="panel category-chart-panel">
    <div class="panel__heading"><div><h2>Pengeluaran per kategori</h2><p>Rincian pengeluaran bulan ini</p></div><span class="panel__more">···</span></div>
    <div class="donut-wrap">
      <div class="donut-chart" :style="{ background: `conic-gradient(${gradient})` }"><div class="donut-chart__inner"><span>Total pengeluaran</span><strong>{{ total.toLocaleString('id-ID') }}</strong></div></div>
    </div>
    <div v-if="categories.length" class="category-legend">
      <div v-for="item in categories" :key="item.name"><span><i :style="{ background: item.color }"></i>{{ item.name }}</span><strong>{{ item.percent }}%</strong></div>
    </div>
    <p v-else class="chart-empty">Belum ada pengeluaran bulan ini.</p>
  </section>
</template>
