<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { authState } from '../../services/authSession'
import { logout } from '../../services/authService'

const router = useRouter()
const userInitial = () => authState.user?.name.trim().charAt(0).toUpperCase() || 'U'

function signOut(): void {
  logout()
  void router.replace('/login')
}
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/dashboard" aria-label="Duitin dashboard">
      <span class="brand__mark">d.</span><span>Duitin</span>
    </RouterLink>
    <div class="topbar__right">
      <span class="topbar__date">{{ new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()) }}</span>
      <div class="avatar" :aria-label="`Profil ${authState.user?.name || 'pengguna'}`">{{ userInitial() }}</div>
      <button class="topbar__logout" type="button" @click="signOut">Keluar</button>
    </div>
  </header>
</template>
