<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ErrorMessage from '../components/common/ErrorMessage.vue'
import { login, register } from '../services/authService'
import { getErrorMessage } from '../types'

const route = useRoute()
const router = useRouter()
const isRegister = computed(() => route.name === 'register')
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const submitting = ref(false)

async function submit(): Promise<void> {
  error.value = ''
  if (isRegister.value && password.value !== confirmPassword.value) {
    error.value = 'Konfirmasi password tidak sama.'
    return
  }

  submitting.value = true
  try {
    if (isRegister.value) {
      await register({ name: name.value, email: email.value, password: password.value })
    } else {
      await login({ email: email.value, password: password.value })
    }

    const redirect = route.query.redirect
    const destination = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
      ? redirect
      : '/dashboard'
    await router.replace(destination)
  } catch (cause) {
    error.value = getErrorMessage(cause)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <RouterLink class="brand auth-card__brand" to="/">
        <span class="brand__mark">d.</span><span>Duitin</span>
      </RouterLink>
      <span class="eyebrow">{{ isRegister ? 'MULAI KELOLA KEUANGAN' : 'SELAMAT DATANG KEMBALI' }}</span>
      <h1>{{ isRegister ? 'Buat akun Duitin' : 'Masuk ke Duitin' }}</h1>
      <p class="auth-card__intro">
        {{ isRegister ? 'Daftar untuk mencatat dan memantau keuanganmu.' : 'Masuk untuk melihat ringkasan keuanganmu.' }}
      </p>

      <ErrorMessage v-if="error" :message="error" />

      <form class="auth-form" @submit.prevent="submit">
        <label v-if="isRegister" class="field">
          <span class="field__label">Nama lengkap</span>
          <input v-model.trim="name" class="input" type="text" autocomplete="name" maxlength="100" required />
        </label>
        <label class="field">
          <span class="field__label">Email</span>
          <input v-model.trim="email" class="input" type="email" autocomplete="email" maxlength="255" required />
        </label>
        <label class="field">
          <span class="field__label">Password</span>
          <input
            v-model="password"
            class="input"
            type="password"
            :autocomplete="isRegister ? 'new-password' : 'current-password'"
            minlength="8"
            maxlength="72"
            required
          />
        </label>
        <label v-if="isRegister" class="field">
          <span class="field__label">Konfirmasi password</span>
          <input
            v-model="confirmPassword"
            class="input"
            type="password"
            autocomplete="new-password"
            minlength="8"
            maxlength="72"
            required
          />
        </label>
        <button class="button button--primary auth-form__submit" type="submit" :disabled="submitting">
          {{ submitting ? 'Memproses...' : isRegister ? 'Buat akun' : 'Masuk' }}
        </button>
      </form>

      <p class="auth-card__switch">
        {{ isRegister ? 'Sudah punya akun?' : 'Belum punya akun?' }}
        <RouterLink :to="isRegister ? '/login' : '/register'">
          {{ isRegister ? 'Masuk' : 'Daftar sekarang' }}
        </RouterLink>
      </p>
    </section>
  </main>
</template>
