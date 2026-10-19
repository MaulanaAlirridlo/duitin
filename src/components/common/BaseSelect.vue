<script setup lang="ts">
import type { SelectOption } from '../../types'

withDefaults(defineProps<{
  modelValue?: string | number
  label?: string
  options?: SelectOption[]
}>(), {
  modelValue: '',
  label: '',
  options: () => [],
})
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function updateValue(event: Event) {
  const target = event.target
  if (target instanceof HTMLSelectElement) emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="field">
    <span v-if="label" class="field__label">{{ label }}</span>
    <select class="input" :value="modelValue" @change="updateValue">
      <slot name="default">
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </slot>
    </select>
  </label>
</template>
