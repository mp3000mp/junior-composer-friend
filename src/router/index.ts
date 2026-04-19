import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/notation' },
    { path: '/degree', name: 'degree', component: HomePage },
    { path: '/notation', name: 'notation', component: HomePage },
  ],
})

export default router
