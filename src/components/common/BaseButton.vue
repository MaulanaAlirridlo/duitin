<script setup lang="ts">
withDefaults(defineProps<{
  variant?: string
  size?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})
</script>

<template>
  <button class="button" :class="[`button--${variant}`, `button--${size}`]" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>
