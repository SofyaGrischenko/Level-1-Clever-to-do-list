<template>
  <transition name="fade">
    <div class="overlay" v-if="isOpen" @click="$emit('close-sidebar')"></div>
  </transition>
  <transition name="slide-fade">
    <div class="sidebar" v-if="isOpen">
      <div class="sidebar-header">
        <h3>{{ filteredTasks.length }} tasks for {{ formattedDate }}</h3>
        <base-button class="close-btn" @click="$emit('close-sidebar')">&times;</base-button>
      </div>
      <div class="sidebar-list">
        <ul>
          <li v-for="(task, i) in filteredTasks" :key="i" >
            <input type="checkbox" />
            {{ task.title }}
          </li>
        </ul>
      </div>
      <base-button class="add-btn">+Add task</base-button>
    </div>
  </transition>
</template>

<script>
import BaseButton from './UI/BaseButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BaseButton,
  },

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },

    selectedDay: {
      type: Date,
      default: null,
    },
  },

  emits: ['close-sidebar'],

  data() {
    return {}
  },

  computed: {
    ...mapGetters(['allTasks']),

    formattedDate() {
      if (this.selectedDay) {
        return this.selectedDay.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        })
      }
      return ''
    },

    filteredTasks() {
      const tasks = this.allTasks

      const selectedDayYear = this.selectedDay.getFullYear()
      const selectedDayMonth = this.selectedDay.getMonth()
      const selectedDayDate = this.selectedDay.getDate()

      return tasks.filter((task) => {
        let createdAt = new Date(task.createdAt)

        const taskCreatedAtYear = createdAt.getFullYear()
        const taskCreatedAtMonth = createdAt.getMonth()
        const taskCreatedAtDate = createdAt.getDate()

        return (
          taskCreatedAtYear === selectedDayYear &&
          taskCreatedAtMonth === selectedDayMonth &&
          taskCreatedAtDate === selectedDayDate
        )
      })
    },
  },
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: var(--white-color);
  box-shadow: 1px 0px 15px var(--black-color);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--accent-color);
  color: var(--white-color);
  font-size: 1.5rem;

  border-bottom: 5px solid #a73c22;
}

.close-btn {
  width: 50px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: var(--black-color);
  opacity: 0.5;
}

.close-btn:hover {
  opacity: 1;
}

.add-btn {
  background-color: var(--accent-color);
  color: var(--white-color);
  font-size: 20px;
  align-self: center;
  position: fixed;
  bottom: 20px;
}

.sidebar-list li {
  padding: 5px 10px;
  font-size: 1.5rem;
  font-weight: 500;
  border-bottom: 1px solid var(--black-color);
}

.add-btn:active {
  border: none;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
