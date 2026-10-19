<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  value: string
  icon?: string
  tone?: string
  caption?: string
}>(), {
  icon: '◈',
  tone: 'blue',
  caption: '',
})
</script>

<template>
  <article class="summary-card">
    <div class="summary-card__top"><span>{{ label }}</span><span class="summary-card__icon" :class="`tone-${tone}`">{{ icon }}</span></div>
    <strong class="summary-card__value">{{ value }}</strong>
    <p v-if="caption" class="summary-card__caption">{{ caption }}</p>
  </article>
</template>
