import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from '@/flows/home/components/view/ViewHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome,
    },
  ],
})

export default router
