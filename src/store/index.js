import { createStore } from 'vuex'
import { handleGetTasks } from '@/services/api/tasks'
import { handleGetMe } from '@/services/api/auth'

const store = createStore({
  state: {
    user: null,
    tasks: [],
  },

  getters: {
    allTasks: (state) => state.tasks,

    currentUser: (state) => state.user,
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },

    addTask(state, task) {
      state.tasks.push(task)
    },

    setTasks(state, tasks) {
      state.tasks = tasks
    },
  },

  actions: {
    async fetchTasks({ commit, state }) {
      if (!state.user || !state.user.uid) {
        console.error('User not authenticated or UID not available. Cannot fetch tasks.')
        return
      }
      try {
        const tasks = await handleGetTasks(state.user.uid)
        commit('setTasks', tasks)
        console.log(tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },

    async fetchUser({ commit }) {
      const user = await handleGetMe()
      console.log(user)

      commit('setUser', user)
    },
  },
})

export default store
