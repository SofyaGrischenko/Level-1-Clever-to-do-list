<template>
  <div class="calendar">
    <div class="calendar-header">
      <!-- TODO: BaseButton -->
      <button class="calendar-header__button" @click="prevMonth">&#10094;</button>
      <span>{{ currentYear }}</span>
      <span>{{ currentMonthName }}</span>
      <button class="calendar-header__button" @click="nextMonth">&#10095;</button>
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
        @select="selectDay"
      />
    </div>
  </div>
</template>

<script>
import CalendarDay from '@/components/UI/Calendar/CalendarDay.vue'

export default {
  components: {
    CalendarDay,
  },

  data() {
    return {
      firstDayInApp: new Date(),
      currentDate: new Date(),
      week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      selectedDay: null,
    }
  },

  computed: {
    currentMonthName() {
      return this.currentDate.toLocaleString('en-US', { month: 'long' })
    },

    currentYear() {
      return this.currentDate.getUTCFullYear()
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
      if (day) {
        this.selectedDay = this.isSelected(day) ? null : day
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
  background-color: #ffffff;
  border-bottom: 2px solid #ccc;
  font-size: 3rem;
}

.calendar-header__button {
  width: 50px;
  height: 50px;
  font-size: 2rem;
  text-align: center;
  color: #f0f8ff;
  background-color: #000000;
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
  background-color: #ffffff;
  padding: 10px;
}
</style>
