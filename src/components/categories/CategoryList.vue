<script setup lang="ts">
import type { Category, EntityId } from '../../types'

withDefaults(defineProps<{ categories?: Category[] }>(), { categories: () => [] })
defineEmits<{
  edit: [category: Category]
  delete: [id: EntityId]
}>()
</script>

<template>
  <div v-if="!categories.length" class="empty-state"><span class="empty-state__icon">◈</span><h3>Belum ada kategori</h3><p>Tambahkan kategori agar transaksi lebih mudah dikelola.</p></div>
  <div v-else class="category-list">
    <article v-for="category in categories" :key="category.id" class="category-item">
      <span class="category-item__icon" :style="{ background: `${category.color}18`, color: category.color }">{{ category.icon }}</span>
      <span class="category-item__name"><strong>{{ category.name }}</strong><small>      {{ category.type === 'income' ? 'Pemasukan' : 'Pengeluaran' }}</small></span>
      <span class="category-item__dot" :style="{ background: category.color }"></span>
      <span class="row-actions"><button aria-label="Edit kategori" @click="$emit('edit', category)">✎</button><button aria-label="Hapus kategori" @click="$emit('delete', category.id)">⌫</button></span>
    </article>
  </div>
</template>
