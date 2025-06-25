<template>
  <div class="calendar">
    <div class="calendar-header">
      <base-button class="calendar-header__button" @click="prevMonth">&#10094;</base-button>
      <span>{{ currentYear }}</span>
      <span>{{ currentMonthName }}</span>
      <base-button class="calendar-header__button" @click="nextMonth">&#10095;</base-button>
    </div>
    <div class="calendar-week">
      <div v-for="day in week" :key="day">{{ day }}</div>
    </div>
    <div class="calendar-grid">
      <calendar-day
        v-for="(day, index) in calendarDays"
        :key="index"
        :day="day"
        :selected="isSelected(day)"
        :disabled="isDisabled(day)"
        :day-tasks="getTasksForDay(day)"
        @select="selectDay"
      />
    </div>
  </div>
</template>

<script>
import CalendarDay from '@/components/UI/Calendar/CalendarDay.vue'
import BaseButton from '../BaseButton.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CalendarDay,
    BaseButton,
  },

  props: {
    selectedDay: {
      type: Date,
      default: null,
    },

    firstDayInApp: {
      type: Date,
      default: null,
    },
  },

  data() {
    return {
      currentDate: new Date(),
      week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    }
  },

  computed: {
    ...mapGetters(['allTasks', 'currentUser']),

    currentMonthName() {
      return this.currentDate.toLocaleString('en-US', { month: 'long' })
    },

    currentYear() {
      return this.currentDate.getFullYear()
    },

    calendarDays() {
      const days = []
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDayOfMonth = new Date(year, month, 1)
      const monthLength = new Date(year, month + 1, 0).getDate()

      let startingDayOfMonth = firstDayOfMonth.getDay()
      startingDayOfMonth = startingDayOfMonth === 0 ? 6 : startingDayOfMonth - 1

      for (let i = 0; i < startingDayOfMonth; i++) {
        days.push(null)
      }

      for (let i = 1; i <= monthLength; i++) {
        days.push(new Date(year, month, i))
      }

      const totalCells = 42
      const remainingDays = totalCells - days.length

      for (let i = 0; i < remainingDays; i++) {
        days.push(null)
      }

      return days
    },
  },

  methods: {
    prevMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1,
      )
    },

    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1,
      )
    },

    selectDay(day) {
      if (day && !this.isDisabled(day)) {
        this.$emit('date-selected', day)
      }
    },

    isSelected(day) {
      if (!this.selectedDay || !day) return false
      return day.toDateString() === this.selectedDay.toDateString()
    },

    isDisabled(day) {
      if (!day) return false
      return day < this.firstDayInApp
    },

    getTasksForDay(day) {
      if (!day) return []

      const dayYear = day.getFullYear()
      const dayMonth = day.getMonth()
      const dayDate = day.getDate()

      return this.allTasks.filter((task) => {
        if (!task || !task.createdAt) {
          return false
        }

        let taskDate
        if (task.createdAt instanceof Date) {
          taskDate = task.createdAt
        } else if (typeof task.createdAt === 'string') {
          taskDate = new Date(task.createdAt)
        }

        if (isNaN(taskDate.getTime())) {
          console.warn('Invalid task.createdAt date format', task)
          return false
        }

        return (
          taskDate.getFullYear() === dayYear &&
          taskDate.getMonth() === dayMonth &&
          taskDate.getDate() === dayDate
        )
      })
    },
  },
}
</script>

<style scoped>
.calendar {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 60vw;
  margin: 20px auto;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--white-color);
  border-bottom: 2px solid #ccc;
  font-size: 3rem;
}

.calendar-header__button {
  min-width: 50px;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  text-align: center;
  color: var(--white-color);
  background-color: var(--black-color);
  border-radius: 40%;
  border: none;
}

.calendar-header__button:active {
  opacity: 0.7;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px 0;
  text-align: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  background-color: var(--white-color);
  padding: 10px;
}
</style>
