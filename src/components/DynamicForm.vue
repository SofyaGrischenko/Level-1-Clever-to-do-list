<template>
  <form class="form-wrapper">
    <h1 v-if="title" class="form__title">{{ title }}</h1>

    <div class="form__error-wrapper">
      <p v-if="currentErrors?.length || this.$slots.errors" class="form__error">
        {{ currentErrors[0] }}
        <slot name="errors" />
      </p>
    </div>

    <div class="form__inputs">
      <template v-for="(item, index) of inputs" :key="index">
        <base-input
          v-if="item.type != 'textarea'"
          v-model="item.value"
          :type="item.type"
          :placeholder="item.placeholder"
          :name="item.field"
        />
        <textarea
          v-else
          v-model="item.value"
          :type="item.type"
          :placeholder="item.placeholder"
          :name="item.field"
          class="form-textarea"
        />
      </template>
    </div>
    <div class="form__buttons">
      <base-button @click.prevent="handleSubmit">{{ buttonName }}</base-button>

      <base-button
        v-if="showCancelButton"
        type="button"
        @click="$emit('cancel')"
        class="cancel-button"
      >
        Cancel
      </base-button>

      <base-button
        v-if="showDeleteButton"
        type="button"
        @click="$emit('delete')"
        class="delete-button"
        >Delete</base-button
      >
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

    showCancelButton: {
      type: Boolean,
      default: false,
    },

    showDeleteButton: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit', 'cancel', 'delete'],

  data() {
    return {
      currentErrors: [],
      isValid: false,
    }
  },

  methods: {
    async handleSubmit() {
      this.currentErrors = []
      const formData = this.inputs.reduce((acc, input) => {
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

      if (!this.currentErrors?.length) this.$emit('submit', formData)
    },
  },

  watch: {
    inputs: {
      handler() {
        this.currentErrors = []
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.form-wrapper {
  background-color: var(--accent-color);
  width: 40vw;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
  border-radius: 2px;
}

.form__title {
  font-size: 3rem;
  color: var(--white-color);
}

.form__inputs {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  width: 70%;
  margin-bottom: 30px;
  gap: 20px;
}

.form__buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--white-color);
  gap: 10px;
}

.form__error-wrapper {
  height: 10vh;
  display: flex;
}

.form__error {
  max-width: 400px;
  margin: 10px;
  padding: 5px;
  border: 2px solid var(--error-bg-color);
  border-radius: 12px;
  font-weight: 800;
  font-size: 20px;
  background-color: var(--error-bg-color);
  color: var(--white-color);
  display: inherit;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form-textarea {
  width: 25vw;
  padding: 12px;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  border-radius: 6px;
  border: none;
  box-shadow: inset 3px 3px 3px #000000a4;
  outline: none;
  max-height: 250px;
}

.base-button {
  min-width: 150px;
}

.delete-button {
  width: 50px;
}
</style>
