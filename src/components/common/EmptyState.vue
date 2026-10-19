<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), {
  title: 'Belum ada data',
  description: 'Data yang Anda tambahkan akan muncul di sini.',
})
</script>

<template>
  <div class="empty-state">
    <span class="empty-state__icon">✳</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <slot />
  </div>
</template>
