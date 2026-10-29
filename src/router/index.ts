import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'
import TransactionsView from '../views/TransactionsView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import AuthView from '../views/AuthView.vue'
import { loadCurrentUser } from '../services/authService'
import { authState } from '../services/authSession'

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    guestOnly?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'landing', component: LandingView, meta: { public: true } },
    { path: '/login', name: 'login', component: AuthView, meta: { public: true, guestOnly: true } },
    { path: '/register', name: 'register', component: AuthView, meta: { public: true, guestOnly: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/transaksi', name: 'transactions', component: TransactionsView },
    { path: '/kategori', name: 'categories', component: CategoriesView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.public && !to.meta.guestOnly) return true

  if (!authState.token) {
    return to.meta.guestOnly
      ? true
      : { name: 'login', query: { redirect: to.fullPath } }
  }

  try {
    await loadCurrentUser()
  } catch {
    if (!authState.token) {
      return to.meta.guestOnly
        ? true
        : { name: 'login', query: { redirect: to.fullPath } }
    }
  }

  if (to.meta.guestOnly && authState.token) return { name: 'dashboard' }
  return true
})

window.addEventListener('duitin:auth-expired', () => {
  void router.replace({
    name: 'login',
    query: { redirect: router.currentRoute.value.fullPath },
  })
})

export default router
