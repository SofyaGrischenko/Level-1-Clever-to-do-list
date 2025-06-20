<template>
  <div class="header">
    <h2>Tassker</h2>
    <base-button @click="logOut">Log Out</base-button>
  </div>
</template>

<script>
import BaseButton from './UI/BaseButton.vue'

export default {
  components: {
    BaseButton,
  },
  methods: {
    logOut() {
      localStorage.removeItem('idToken')
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
  background-color: #ffffff;
  width: 100vw;
  color: #000000;
  box-shadow: 2px 2px 10px #919191;
}
</style>
