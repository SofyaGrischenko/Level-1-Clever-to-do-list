import { createStore } from 'vuex'
import {
  handleCreateTask,
  handleDeleteTask,
  handleGetTasks,
  handleUpdateTask,
} from '@/services/api/tasks'
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

    setTaskUpdated(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },

    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
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
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },

    async fetchUser({ commit }) {
      const user = await handleGetMe()
      commit('setUser', user)
    },

    async createTask({ commit, state }, taskData) {
      try {
        const newTask = await handleCreateTask(taskData, state.user.uid)
        commit('addTask', newTask)
        return newTask
      } catch (error) {
        console.error('Error creating task:', error)
        throw error
      }
    },

    async updateTask({ commit }, taskData) {
      await handleUpdateTask(taskData)

      commit('setTaskUpdated', taskData)
    },

    async deleteTaskFromStore({ commit }, taskId) {
      try {
        await handleDeleteTask(taskId)
        commit('deleteTask', taskId)
      } catch (err) {
        console.error(err)
        throw err
      }
    },
  },
})

export default store
