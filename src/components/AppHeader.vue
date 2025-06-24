<template>
  <div class="header">
    <h2>Tassker</h2>
    <base-button @click="logout">Log Out</base-button>
  </div>
</template>

<script>
import BaseButton from './UI/BaseButton.vue'
import { logOut } from '@/services/api/auth'
export default {
  components: {
    BaseButton,
  },
  methods: {
    logout() {
      logOut()
      localStorage.removeItem('uid')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: var(--white-color);
  width: 100vw;
  color: var(--black-color);
  box-shadow: 2px 2px 10px #919191;
}
</style>
