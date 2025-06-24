import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach(async (to, from, next) => {
  const uid = localStorage.getItem('uid')

  if (uid && !to.meta?.isAuth) {
    next(to?.name === 'invalid' ? null : '/')
  } else if (!uid && to.meta?.isAuth) {
    next('/login')
  } else next()
})

export default router
