import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    tasks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    setTask(state, task) {
      state.tasks.push(task)
    },
  },
})

export default store
