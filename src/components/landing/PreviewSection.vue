<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="preview" class="preview section">
    <div class="wrap preview__inner">
      <div class="preview__copy"><span class="eyebrow">SATU LANGKAH LEBIH DEKAT</span><h2>Mulai dari sekarang,<br><span>untuk nanti yang lebih baik.</span></h2><p>Tak perlu spreadsheet yang rumit. Duitin membantumu memahami uang dengan cara yang sederhana dan terasa dekat.</p><RouterLink class="button button--primary button--lg" to="/dashboard">Coba Duitin sekarang <span>→</span></RouterLink></div>
      <div class="preview-card"><div class="preview-card__top"><span>Saldo bulan ini</span><span class="preview-card__badge">● Stabil</span></div><strong>Rp 8.240.500</strong><div class="preview-card__line"><span></span></div><div class="preview-card__foot"><span>Target tabungan</span><strong>68%</strong></div><div class="preview-card__progress"><i></i></div><small>Rp 6.800.000 dari target Rp 10.000.000</small></div>
    </div>
  </section>
</template>
