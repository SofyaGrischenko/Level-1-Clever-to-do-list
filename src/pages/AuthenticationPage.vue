<template>
  <div class="page-wrapper">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign In'" />
    <span>New to this app?</span>
    <router-link to="/registration">sign up</router-link>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { login } from '@/services/api/login'
import router from '@/router'

export default {
  components: {
    DynamicForm,
  },

  data() {
    return {
      inputs: [
        {
          type: 'email',
          placeholder: 'Email',
          field: 'email',
          value: null,
        },
        {
          type: 'password',
          placeholder: 'Password',
          field: 'password',
          value: null,
        },
      ],
    }
  },

  methods: {
    async submitForm(formValue) {
      try {
        await login(formValue)

        console.log(formValue)
      } catch (error) {
        console.error(error)
      }
    },
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
