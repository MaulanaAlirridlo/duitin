<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: 'Terjadi kesalahan. Silakan coba lagi.' })
</script>

<template><p class="error-message" role="alert">{{ message }}</p></template>
