<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: '' })
defineEmits<{ close: [] }>()
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <section class="modal" role="dialog" aria-modal="true" :aria-label="title">
      <header class="modal__header">
        <h2>{{ title }}</h2>
        <button class="icon-button" aria-label="Tutup" @click="$emit('close')">×</button>
      </header>
      <slot />
    </section>
  </div>
</template>
