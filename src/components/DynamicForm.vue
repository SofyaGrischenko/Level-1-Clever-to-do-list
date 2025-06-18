<template>
  <form class="form-wrapper">
    <h1 v-if="formType === 'registration'" class="form__title">Sign Up</h1>
    <h1 v-else class="form__title">Sign In</h1>
    <div class="form__inputs">
      <base-input
        v-for="(item, index) of currentInputs"
        v-model="formValues[item.model]"
        :key="index"
        :type="item.type"
        :placeholder="item.placeholder"
      />
    </div>
    <div class="form__buttons">
      <base-button @click.prevent="handleSubmit">confirm</base-button>
    </div>
  </form>
</template>

<script>
import { registration } from '@/services/api/registration'
import { login } from '@/services/api/login'
import BaseButton from './UI/BaseButton.vue'
import BaseInput from './UI/BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseInput,
  },

  props: {
    formType: {
      type: String,
      required: true,
      //returns current form value
      typeCheck: (value) => ['login', 'registration'].includes(value),
    },
  },

  data() {
    return {
      formValues: {
        name: '',
        email: '',
        password: '',
      },
      inputs: [
        {
          type: 'text',
          placeholder: 'Name',
          model: 'name',
        },
        {
          type: 'email',
          placeholder: 'Email',
          model: 'email',
        },
        {
          type: 'password',
          placeholder: 'Password',
          model: 'password',
        },
      ],
    }
  },

  //watch & computed before methods
  computed: {
    currentInputs() {
      if (this.formType === 'login') {
        return this.inputs.filter((input) => input.model === 'email' || input.model === 'password')
      } else {
        return this.inputs
      }
    },
  },

  methods: {
    async handleSubmit() {
      const user = {
        name: this.formValues.name,
        email: this.formValues.email,
        password: this.formValues.password,
      }

      if (this.formType === 'registration') {
        await registration(user)
      } else if (this.formType === 'login') {
        await login(user)
      }

      this.formValues.name = ''
      this.formValues.email = ''
      this.formValues.password = ''
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  background-color: #ed6b34;
  width: 35vw;
  height: 50vh;
  margin: 20vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form__title {
  font-size: 3rem;
  color: aliceblue;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 40px auto;
  gap: 20px;
}

.form__buttons {
  display: flex;
  justify-content: center;
}
</style>
