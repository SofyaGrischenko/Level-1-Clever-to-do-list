<template>
  <div class="calendar-day__wrap" :day="day">
    <div v-if="day" :class="styles" @click="handleClick">
      <p>
        {{ day.getDate() }}
      </p>
      <!-- <p>&#9711;</p> -->
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
  },

  computed: {
    isToday() {
      if (!this.day) return
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
  border: 3px solid #ff5517;
  color: #ff5517;
}

.calendar-day.current {
  background-color: #000000;
  color: aliceblue;
}

.calendar-day.disabled {
  color: #565656;
  background-color: #a3a3a3;
  cursor: default;
}
</style>
