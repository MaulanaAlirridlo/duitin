<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  min?: string | number
}>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  required: false,
})
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

function updateValue(event: Event) {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) return
  emit('update:modelValue', target.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <label class="field">
    <span v-if="label" class="field__label">{{ label }}</span>
    <input
      class="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      @input="updateValue"
    />
  </label>
</template>
