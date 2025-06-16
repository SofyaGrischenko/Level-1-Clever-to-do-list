const routes = [
  {
    path: '/registration',
    component: () => import('@/pages/RegistrationPage.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/AuthenticationPage.vue'),
  },
  //redirect from '/'
  // при регистрации\логине редирект на dashboard происходит
  {
    path: '/tasks',
    component: () => import('@/pages/DashboardPage.vue'),
  },
  {
    path: '/tasks/:id',
    component: () => import('@/pages/TaskPage.vue'),
  },
]

export default routes
//читать про vue routes
