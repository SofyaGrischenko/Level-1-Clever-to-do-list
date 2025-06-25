<template>
  <custom-calendar
    :selectedDay="selectedDay"
    @date-selected="handleDayClick"
    :first-day-in-app="firstDayInApp"
  />

  <side-bar :isOpen="isSidebarOpen" :selectedDay="selectedDay" @closeSidebar="closeSidebar" />
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import CustomCalendar from '@/components/UI/Calendar/CustomCalendar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CustomCalendar,
    SideBar,
  },

  data() {
    return {
      isSidebarOpen: false,
      selectedDay: null,
    }
  },

  computed: {
    ...mapGetters(['currentUser']),

    firstDayInApp() {
      if (this.currentUser) {
        const createdAt = new Date(this.currentUser.metadata.creationTime)
        createdAt.setDate(createdAt.getDate() - 1)
        return createdAt
      }
      return new Date('1970')
    },
  },

  methods: {
    ...mapActions(['fetchTasks']),

    handleDayClick(day) {
      this.selectedDay = day
      this.isSidebarOpen = true
    },

    closeSidebar() {
      this.isSidebarOpen = false
      this.selectedDate = null
    },
  },

  watch: {
    currentUser: {
      handler(newUser) {
        if (newUser && newUser.uid) {
          this.fetchTasks()
        }
      },
      immediate: true,
    },
  },
}
</script>
