<script setup lang="ts">
interface Feature {
  icon: string
  tone: string
  title: string
  text: string
}

const features: Feature[] = [
  { icon: '◫', tone: 'blue', title: 'Ringkasan yang jelas', text: 'Lihat saldo, pemasukan, dan pengeluaran dalam satu tampilan yang mudah dipahami.' },
  { icon: '⇄', tone: 'green', title: 'Catat tanpa ribet', text: 'Tambahkan transaksi harian dengan kategori agar setiap rupiah punya jejak.' },
  { icon: '◉', tone: 'orange', title: 'Kenali kebiasaanmu', text: 'Grafik sederhana membantu kamu menemukan pola pengeluaran setiap bulan.' },
]
</script>

<template>
  <section id="fitur" class="features section wrap">
    <div class="section-heading"><span class="eyebrow">SEMUA YANG KAMU BUTUHKAN</span><h2>Keuangan rapi,<br><span>keputusan lebih pasti.</span></h2><p>Mulai dari kebiasaan kecil, bangun masa depan finansial yang lebih baik.</p></div>
    <div class="feature-grid"><article v-for="feature in features" :key="feature.title" class="feature-card"><span class="feature-card__icon" :class="`tone-${feature.tone}`">{{ feature.icon }}</span><h3>{{ feature.title }}</h3><p>{{ feature.text }}</p><span class="feature-card__arrow">↗</span></article></div>
  </section>
</template>
