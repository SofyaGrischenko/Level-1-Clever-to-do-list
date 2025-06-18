<template>
  <div class="page-wrapper">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign up'" />
    <span>Already have an account?</span>
    <router-link to="/login">sign in</router-link>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { registration } from '@/services/api/registration'

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
        {
          type: 'password',
          placeholder: 'Confirm password',
          field: 'passwordConfirm',
          value: null,
        },
      ],
    }
  },

  methods: {
    async submitForm(formValue) {
      try {
        await registration(formValue)
        
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
