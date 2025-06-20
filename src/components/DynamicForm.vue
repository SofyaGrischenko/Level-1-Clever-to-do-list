<template>
  <form class="form-wrapper">
    <h1 v-if="title" class="form__title">{{ title }}</h1>

    <p v-if="currentErrors?.length" class="form__error">
      {{ currentErrors[0] }}
    </p>

    <div class="form__inputs">
      <base-input
        v-for="(item, index) of inputs"
        v-model="item.value"
        :key="index"
        :type="item.type"
        :placeholder="item.placeholder"
      />
    </div>
    <div class="form__buttons">
      <base-button @click.prevent="handleSubmit">{{ buttonName }}</base-button>
    </div>
  </form>
</template>

<script>
import BaseButton from './UI/BaseButton.vue'
import BaseInput from './UI/BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseInput,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    buttonName: {
      type: String,
      default: 'Submit',
    },
    inputs: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['submit'],

  data() {
    return {
      currentErrors: [],
      isValid: false,
    }
  },

  methods: {
    async handleSubmit() {
      this.currentErrors = []
      const form = this.inputs.reduce((acc, input) => {
        if (input?.validations?.length) {
          for (let rule of input.validations) {
            if (rule?.rule && !rule.rule(input.value)) {
              this.currentErrors.push(rule.errorMessage)
            }
          }
        }
        acc[input.field] = input.value
        return acc
      }, {})

      if (!this.currentErrors?.length) this.$emit('submit', form)
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  background-color: #ed6b34;
  width: 40vw;
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
  border-radius: 2px;
}

.form__title {
  font-size: 3rem;
  color: aliceblue;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  width: 70%;
  margin: 30px auto;
  gap: 20px;
}

.form__buttons {
  display: flex;
  justify-content: center;
  color: #fafafa;
}

.form__error {
  max-width: 400px;
  margin: 10px;
  padding: 5px;
  border: 2px solid red;
  border-radius: 2px;
  font-weight: 800;
  font-size: 20px;
  background-color: #ff000060;
  color: #ffffff;
}
</style>
