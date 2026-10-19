<script setup lang="ts">
import type { TransactionType } from '../../types'

defineProps<{ type: TransactionType }>()
</script>

<template><span class="type-badge" :class="type === 'income' ? 'type-badge--income' : 'type-badge--expense'">{{ type === 'income' ? 'Masuk' : 'Keluar' }}</span></template>
