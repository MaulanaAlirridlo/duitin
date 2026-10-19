<script setup lang="ts">
import HeroSection from '../components/landing/HeroSection.vue'
import FeaturesSection from '../components/landing/FeaturesSection.vue'
import PreviewSection from '../components/landing/PreviewSection.vue'
</script>

<template>
  <div class="landing-page"><HeroSection /><FeaturesSection /><PreviewSection /><footer class="landing-footer wrap"><RouterLink class="brand" to="/"><span class="brand__mark">d.</span><span>Duitin</span></RouterLink><span>© {{ new Date().getFullYear() }} Duitin. Kelola uang dengan lebih tenang.</span></footer></div>
</template>
