export const routes = [
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/AuthenticationPage.vue'),
    meta: {
      isAuth: false,
    },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/tasks/:id',
    name: 'task',
    component: () => import('@/pages/TaskPage.vue'),
    meta: {
      isAuth: true,
    },
  },
  {
    path: '/',
    redirect: '/tasks',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'invalid',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]
