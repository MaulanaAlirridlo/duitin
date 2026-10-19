<script setup lang="ts">
import type { TableColumn, Transaction } from '../../types'

const props = withDefaults(defineProps<{
  columns: TableColumn[]
  rows: Transaction[]
  rowKey?: keyof Transaction
}>(), { rowKey: 'id' })
const getRowKey = (row: Transaction) => row[props.rowKey]
</script>

<template>
  <div class="table-wrap">
    <table class="table">
      <thead><tr><th v-for="column in props.columns" :key="column.key">{{ column.label }}</th></tr></thead>
      <tbody>
        <tr v-for="row in props.rows" :key="getRowKey(row)">
          <slot name="row" :row="row" />
        </tr>
        <tr v-if="!props.rows.length"><td :colspan="props.columns.length" class="table__empty"><slot name="empty">Belum ada data.</slot></td></tr>
      </tbody>
    </table>
  </div>
</template>
