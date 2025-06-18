const routes = [
  {
    path: '/registration',
    component: () => import('@/pages/RegistrationPage.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/AuthenticationPage.vue'),
  },
  {
    path: '/tasks',
    component: () => import('@/pages/DashboardPage.vue'),
  },
  {
    path: '/tasks/:id',
    component: () => import('@/pages/TaskPage.vue'),
  },
  {
    path: '/',
    redirect: '/tasks',
    //check userr auth
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

export default routes
