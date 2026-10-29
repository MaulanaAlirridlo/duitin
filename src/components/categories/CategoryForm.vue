<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import BaseInput from '../common/BaseInput.vue'
import BaseSelect from '../common/BaseSelect.vue'
import BaseModal from '../common/BaseModal.vue'
import type { Category, CategoryFormValue } from '../../types'

const props = defineProps<{ category: Category | null }>()
const emit = defineEmits<{
  save: [category: CategoryFormValue]
  close: []
}>()
const categoryEmojis = ['📦', '🍜', '🛒', '🏠', '🚗', '🚌', '⛽', '📱', '💡', '🎮', '🎬', '👕', '💊', '🏥', '🎓', '📚', '💰', '💼', '🎁', '🐶', '✈️', '☕', '🍽️', '🧾']
const emptyForm = (): CategoryFormValue => ({ name: '', type: 'expense', icon: '📦', color: '#64748b' })
const form = reactive<CategoryFormValue>(emptyForm())
watch(() => props.category, (value) => Object.assign(form, value ? { ...value } : emptyForm()), { immediate: true })
function submit(): void {
  if (!form.name.trim()) return
  emit('save', { ...form, name: form.name.trim() })
}
</script>

<template>
  <BaseModal :title="category ? 'Edit kategori' : 'Tambah kategori'" @close="$emit('close')">
    <form class="form-grid" @submit.prevent="submit">
      <div class="form-grid__wide"><BaseInput v-model="form.name" label="Nama kategori" placeholder="Contoh: Pendidikan" required /></div>
      <BaseSelect v-model="form.type" label="Jenis kategori"><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></BaseSelect>
      <div class="field">
        <span class="field__label">Pilih ikon</span>
        <div class="emoji-picker" role="group" aria-label="Pilihan ikon kategori">
          <button
            v-for="emoji in categoryEmojis"
            :key="emoji"
            type="button"
            class="emoji-picker__option"
            :class="{ 'emoji-picker__option--selected': form.icon === emoji }"
            :aria-label="`Pilih ikon ${emoji}`"
            :aria-pressed="form.icon === emoji"
            @click="form.icon = emoji"
          >{{ emoji }}</button>
        </div>
      </div>
      <label class="field"><span class="field__label">Warna</span><input v-model="form.color" class="input color-input" type="color"></label>
      <div class="form-actions form-grid__wide"><BaseButton variant="secondary" @click="$emit('close')">Batal</BaseButton><BaseButton type="submit">Simpan kategori</BaseButton></div>
    </form>
  </BaseModal>
</template>
