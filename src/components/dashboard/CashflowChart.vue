<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CashflowItem } from '../../types'

const props = withDefaults(defineProps<{ cashflow?: CashflowItem[] }>(), { cashflow: () => [] })
const period = ref('6')
const months = computed(() => {
  const count = Number(period.value)
  return Array.from({ length: count }, (_, index) => {
    const date = new Date()
    date.setDate(1)
    date.setMonth(date.getMonth() - (count - index - 1))
    const key = date.toISOString().slice(0, 7)
    const data = props.cashflow.find((item) => item.date.startsWith(key))
    return { label: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date), income: data?.income || 0, expense: data?.expense || 0 }
  })
})
const maxValue = computed(() => Math.max(1, ...months.value.flatMap((month) => [month.income, month.expense])))
const chartHeight = 150
const barHeight = (value: number) => Math.max(3, value / maxValue.value * chartHeight)
</script>

<template>
  <section class="panel chart-panel">
    <div class="panel__heading"><div><h2>Arus kas</h2><p>Pemasukan dan pengeluaranmu</p></div>
      <select v-model="period" class="select-compact" aria-label="Periode grafik"><option value="6">6 bulan terakhir</option><option value="3">3 bulan terakhir</option><option value="12">12 bulan terakhir</option></select>
    </div>
    <div class="chart-legend"><span><i class="legend-dot legend-dot--income"></i>Pemasukan</span><span><i class="legend-dot legend-dot--expense"></i>Pengeluaran</span></div>
    <div class="bar-chart">
      <div v-for="month in months" :key="month.label" class="bar-chart__group">
        <div class="bar-chart__bars"><span class="bar bar--income" :style="{ height: `${barHeight(month.income)}px` }" :title="`Pemasukan Rp ${month.income.toLocaleString('id-ID')}`"></span><span class="bar bar--expense" :style="{ height: `${barHeight(month.expense)}px` }" :title="`Pengeluaran Rp ${month.expense.toLocaleString('id-ID')}`"></span></div>
        <span class="bar-chart__label">{{ month.label }}</span>
      </div>
    </div>
    <div class="chart-grid-lines"><i></i><i></i><i></i></div>
  </section>
</template>
