<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'

const route = useRoute()
</script>

<template>
  <RouterView v-if="route.meta.public === true" />
  <AppLayout v-else>
    <RouterView />
  </AppLayout>
</template>
