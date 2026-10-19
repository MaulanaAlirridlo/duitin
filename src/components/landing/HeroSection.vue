<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="hero__glow"></div>
    <nav class="landing-nav wrap">
      <RouterLink class="brand" to="/"><span class="brand__mark">d.</span><span>Duitin</span></RouterLink>
      <div class="landing-nav__links"><a href="#fitur">Fitur</a><a href="#preview">Preview</a></div>
      <RouterLink class="button button--primary button--sm" to="/dashboard">Buka aplikasi <span>→</span></RouterLink>
    </nav>
    <div class="hero__content wrap">
      <div class="hero__copy">
        <span class="eyebrow"><i></i> KEUANGAN LEBIH TERATUR, HIDUP LEBIH TENANG</span>
        <h1>Uangmu, ceritamu.<br><span>Atur dengan mudah.</span></h1>
        <p>Catat pemasukan dan pengeluaran, pahami kebiasaan finansialmu, dan wujudkan rencana masa depan dengan Duitin.</p>
        <div class="hero__actions"><RouterLink class="button button--primary button--lg" to="/dashboard">Mulai kelola uang <span>→</span></RouterLink><a class="hero__secondary" href="#preview"><span class="play-icon">▶</span> Lihat preview</a></div>
        <div class="hero__trust"><div class="avatar-stack"><i>A</i><i>N</i><i>R</i></div><span>Dipercaya untuk mengatur<br><strong>keuangan sehari-hari</strong></span></div>
      </div>
      <div class="hero__visual" aria-label="Preview ringkasan keuangan">
        <div class="floating-card floating-card--top"><span class="floating-card__icon">↗</span><span><small>Total pemasukan</small><strong>Rp 12.450.000</strong></span><em>+12,8%</em></div>
        <div class="mock-dashboard">
          <div class="mock-dashboard__top"><span class="brand__mark">d.</span><span class="mock-dots">···</span></div>
          <p class="mock-dashboard__greeting">Selamat pagi, Aditya 👋</p><h3>Ringkasan keuangan</h3>
          <div class="mock-balance"><small>Total saldo</small><strong>Rp 8.240.500</strong><span>↗ 8.2% dari bulan lalu</span></div>
          <div class="mock-stats"><div><i class="mock-stat-icon mock-stat-icon--green">↓</i><small>Pemasukan</small><strong>Rp 12,4 jt</strong></div><div><i class="mock-stat-icon mock-stat-icon--orange">↑</i><small>Pengeluaran</small><strong>Rp 4,2 jt</strong></div></div>
          <div class="mock-chart"><div class="mock-chart__heading"><strong>Arus kas</strong><span>6 bulan ▾</span></div><div class="mock-chart__bars"><i style="height:42%"></i><i style="height:66%"></i><i style="height:51%"></i><i style="height:82%"></i><i style="height:62%"></i><i style="height:96%"></i><i style="height:72%"></i><i style="height:86%"></i><i style="height:56%"></i><i style="height:78%"></i><i style="height:68%"></i><i style="height:100%"></i></div><div class="mock-chart__labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span></div></div>
        </div>
        <div class="floating-card floating-card--bottom"><span class="floating-card__icon floating-card__icon--orange">↗</span><span><small>Pengeluaran hari ini</small><strong>Rp 245.000</strong></span><span class="floating-card__dots">•••</span></div>
        <span class="hero__sparkle">✦</span>
      </div>
    </div>
  </section>
</template>
