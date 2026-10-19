<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="topbar">
    <RouterLink class="brand" to="/dashboard" aria-label="Duitin dashboard">
      <span class="brand__mark">d.</span><span>Duitin</span>
    </RouterLink>
    <div class="topbar__right">
      <span class="topbar__date">{{ new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()) }}</span>
      <div class="avatar" aria-label="Profil pengguna">A</div>
    </div>
  </header>
</template>
