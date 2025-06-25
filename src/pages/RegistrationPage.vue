<template>
  <div class="page-wrapper">
    <dynamic-form :inputs="inputs" @submit="submitForm" :title="'Sign up'">
      <template v-slot:errors v-if="serviceErrors">
        <p>{{ serviceErrors }}</p>
      </template>
    </dynamic-form>
    <span>Already have an account?</span>
    <router-link to="/login">sign in</router-link>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { registration } from '@/services/api/auth'
import { required, minLength, isEmail, isSame } from '@/utils/validations'

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
        {
          type: 'password',
          placeholder: 'Confirm password',
          field: 'passwordConfirm',
          value: null,
          validations: [
            {
              rule: (val) => required(val),
              errorMessage: 'Comfirm password is required',
            },
            {
              rule: (val) => minLength(val),
              errorMessage: 'Comfirm password must be at least 6 characters',
            },
            {
              rule: (val) => isSame(val, this.inputs[1].value),
              errorMessage: 'Passwords are not the same',
            },
          ],
        },
      ],

      serviceErrors: null,
    }
  },

  methods: {
    async submitForm(formValue) {
      this.serviceErrors = null
      try {
        const user = await registration(formValue)
        localStorage.setItem('uid', user.uid)

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
