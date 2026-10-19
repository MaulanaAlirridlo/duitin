<script setup lang="ts">
import AppNavbar from './AppNavbar.vue'
import AppSidebar from './AppSidebar.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="app-shell">
    <AppNavbar />
    <div class="app-body">
      <AppSidebar />
      <div class="app-content">
        <main class="page-content"><slot /></main>
        <AppFooter />
      </div>
    </div>
  </div>
</template>
