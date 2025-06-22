<template>
  <div class="page-wrapper">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign In'" />
    <span>New to this app?</span>
    <router-link to="/registration">sign up</router-link>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { login } from '@/services/api/auth'
import { required, isEmail, minLength } from '@/utils/validations'
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
          validations: [
            {
              rule: (val) => required(val),
              errorMessage: 'Email is required',
            },
            {
              rule: (val) => isEmail(val),
              errorMessage: 'Please enter a valid email address',
            },
          ],
        },
        {
          type: 'password',
          placeholder: 'Password',
          field: 'password',
          value: null,
          validations: [
            {
              rule: (val) => required(val),
              errorMessage: 'Password is required',
            },
            {
              rule: (val) => minLength(val),
              errorMessage: 'Password must be at least 6 characters',
            },
          ],
        },
      ],
    }
  },

  methods: {
    validateForm() {},

    async submitForm(formValue) {
      try {
        const user = await login(formValue)
        console.log('user', user)
        localStorage.setItem('idToken', user.accessToken)
        this.$router.push('/')
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
