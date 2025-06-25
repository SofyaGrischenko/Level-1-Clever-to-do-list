<template>
  <div class="calendar-day__wrap" :day="day">
    <div v-if="day" :class="styles" @click="handleClick">
      <p>
        {{ day.getDate() }}
      </p>
      <div class="task-dots" v-if="!disabled">
        <span v-for="i in taskCount" :key="i" class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Date,
      default: null,
    },
    selected: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    dayTasks: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    isToday() {
      if (!this.day) return false
      const today = new Date()
      return this.day.toDateString() === today.toDateString()
    },

    styles() {
      return {
        'calendar-day': true,
        selected: this.day && this.selected,
        current: this.day && this.isToday,
        disabled: this.day && this.disabled,
      }
    },

    taskCount() {
      return Math.min(this.dayTasks.length, 3)
    },
  },

  methods: {
    handleClick() {
      if (this.day) {
        this.$emit('select', this.day)
      }
    },
  },
}
</script>

<style scoped>
.calendar-day__wrap {
  min-height: 70px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.calendar-day {
  width: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 3px 3px 5px rgb(160, 160, 160);
}

.calendar-day.selected {
  border: 3px solid var(--accent-color);
  color: var(--accent-color);
}

.calendar-day.current {
  background-color: var(--black-color);
  color: var(--white-color);
}

.calendar-day.disabled {
  color: var(--disabled-text);
  background-color: var(--disabled-bg);
  cursor: default;
}

.task-dots {
  display: flex;
  gap: 3px;
  margin-top: 5px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: var(--accent-color);
  border-radius: 50%;
}
</style>
