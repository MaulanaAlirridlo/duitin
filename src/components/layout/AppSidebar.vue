<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavigationLink {
  to: string
  label: string
  icon: string
}

const links: NavigationLink[] = [
  { to: '/dashboard', label: 'Ringkasan', icon: '◫' },
  { to: '/transaksi', label: 'Transaksi', icon: '⇄' },
  { to: '/kategori', label: 'Kategori', icon: '◈' },
]
</script>

<template>
  <aside class="sidebar">
    <p class="sidebar__label">MENU UTAMA</p>
    <nav class="sidebar__nav" aria-label="Navigasi utama">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="sidebar__link" active-class="is-active">
        <span class="sidebar__icon">{{ link.icon }}</span>{{ link.label }}
      </RouterLink>
    </nav>
    <div class="sidebar__tip">
      <span class="sidebar__tip-icon">✦</span>
      <strong>Atur keuanganmu</strong>
      <p>Catat setiap pemasukan dan pengeluaran agar lebih terkontrol.</p>
      <RouterLink to="/transaksi">Mulai mencatat <span>→</span></RouterLink>
    </div>
    <div class="sidebar__profile">
      <div class="avatar avatar--small">A</div>
      <div><strong>Aditya Pratama</strong><span>Personal account</span></div>
      <span class="sidebar__dots">···</span>
    </div>
  </aside>
</template>
