<template>
  <div class="page-wrapper">
    <dynamic-form form-type="login" />
    <span>New to this app?</span>
    <router-link to="/registration">sign up</router-link>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'

export default {
  components: {
    DynamicForm,
  },
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
