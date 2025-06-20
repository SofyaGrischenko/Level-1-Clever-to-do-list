import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  // Logic to get token from localStorage
  const token = localStorage.getItem('idToken')
  
  if (token && !to.meta?.isAuth) {
    next(to?.name === 'invalid' ? null : '/')
  } else if (!token && to.meta?.isAuth) {
    next('/login')
  } else next()
})

export default router
