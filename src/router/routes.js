export const routes = [
  {
    path: '/registration',
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      isAuth: false
    }
  },
  {
    path: '/login',
    component: () => import('@/pages/AuthenticationPage.vue'),
  },
  {
    path: '/tasks',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/tasks/:id',
    component: () => import('@/pages/TaskPage.vue'),
  },
  {
    path: '/',
    redirect: '/tasks',
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
