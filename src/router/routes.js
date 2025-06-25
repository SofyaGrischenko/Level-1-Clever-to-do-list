import store from '@/store'

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
    props: (route) => {
      const id = route.params.id
      const selectedDay = route.query.selectedDay

      const isNew = id === 'new'

      return { id: isNew ? null : id, isNew, selectedDay }
    },

    beforeEnter: (to, from, next) => {
      const taskId = to.params.id

      if (taskId === 'new') {
        next()
        return
      }

      const allTasks = store.getters.allTasks

      const taskExists = allTasks.some((task) => task.id === taskId)

      if (taskExists) {
        next()
      } else {
        next({ name: 'invalid' })
      }
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
