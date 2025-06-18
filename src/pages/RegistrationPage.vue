<template>
  <div class="page-wrapper">
    <registration-form formType="registration" />
    <span>Already have an account?</span>
    <router-link to="/login">sign in</router-link>
  </div>
</template>

<script>
import RegistrationForm from '@/components/DynamicForm.vue'
export default {
  components: {
    RegistrationForm,
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
