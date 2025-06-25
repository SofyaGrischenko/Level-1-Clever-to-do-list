<template>
  <div class="page-wrapper">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign In'">
      <template v-slot:errors v-if="serviceErrors">
        <p>{{ serviceErrors }}</p>
      </template>
    </dynamic-form>
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
      serviceErrors: null,
    }
  },

  methods: {
    validateForm() {},

    async submitForm(formValue) {
      this.serviceErrors = null
      try {
        const user = await login(formValue)
        localStorage.setItem('uid', user.uid)
        console.log(user)

        this.$store.commit('setUser', user)
        this.$router.push('/')
      } catch (error) {
        this.serviceErrors = error
        console.error(error)
      }
    },
  },

  watch: {
    inputs: {
      handler() {
        this.serviceErrors = null
      },
      deep: true,
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
