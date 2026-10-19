<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseButton from '../common/BaseButton.vue'
import BaseInput from '../common/BaseInput.vue'
import BaseSelect from '../common/BaseSelect.vue'
import BaseModal from '../common/BaseModal.vue'
import type { Category, Transaction, TransactionFormValue, TransactionType } from '../../types'

const props = withDefaults(defineProps<{
  transaction?: Transaction | null
  categories?: Category[]
}>(), {
  transaction: null,
  categories: () => [],
})
const emit = defineEmits<{
  save: [transaction: TransactionFormValue]
  close: []
}>()
const blankForm = (): TransactionFormValue => ({
  description: '',
  type: 'expense' as TransactionType,
  category: props.categories.find((category) => category.type === 'expense')?.name || '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  note: '',
})
const form = reactive<TransactionFormValue>(blankForm())
watch(() => props.transaction, (value) => Object.assign(form, value ? { ...value } : blankForm()), { immediate: true })
watch(() => form.type, () => {
  const available = props.categories.filter((category) => category.type === form.type)
  if (!available.some((category) => category.name === form.category)) form.category = available[0]?.name || ''
})
function submit(): void {
  if (!form.description.trim() || !form.category || Number(form.amount) <= 0 || !form.date) return
  const { id, category_id } = form
  emit('save', { ...form, ...(id !== undefined ? { id } : {}), ...(category_id !== undefined ? { category_id } : {}), description: form.description.trim(), amount: Number(form.amount) })
}
</script>

<template>
  <BaseModal :title="transaction ? 'Edit transaksi' : 'Tambah transaksi'" @close="$emit('close')">
    <form class="form-grid" @submit.prevent="submit">
      <div class="form-grid__wide"><BaseInput v-model="form.description" label="Nama transaksi" placeholder="Contoh: Belanja bulanan" required /></div>
      <BaseSelect v-model="form.type" label="Tipe"><option value="expense">Pengeluaran</option><option value="income">Pemasukan</option></BaseSelect>
      <BaseSelect v-model="form.category" label="Kategori" required><option value="" disabled>Pilih kategori</option><option v-for="category in categories.filter((item) => item.type === form.type)" :key="category.id" :value="category.name">{{ category.icon }} {{ category.name }}</option></BaseSelect>
      <BaseInput v-model="form.amount" type="number" min="1" label="Jumlah (Rp)" placeholder="0" required />
      <BaseInput v-model="form.date" type="date" label="Tanggal" required />
      <div class="form-grid__wide"><BaseInput v-model="form.note" label="Catatan (opsional)" placeholder="Tambahkan catatan..." /></div>
      <div class="form-actions form-grid__wide"><BaseButton variant="secondary" @click="$emit('close')">Batal</BaseButton><BaseButton type="submit">{{ transaction ? 'Simpan perubahan' : 'Simpan transaksi' }}</BaseButton></div>
    </form>
  </BaseModal>
</template>
