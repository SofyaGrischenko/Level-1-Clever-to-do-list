<template>
  <div class="page-wrap">
    <dynamic-form
      class="task-form"
      :title="isNew ? 'Create New Task' : 'Edit Task'"
      :inputs="inputs"
      :button-name="isNew ? 'Create' : 'Save'"
      :show-cancel-button="true"
      :show-delete-button="!isNew"
      @submit="saveTask"
      @cancel="cancelEdit"
      @delete="deleteTask"
    />
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { maxLength, required } from '@/utils/validations'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    DynamicForm,
  },

  props: {
    isNew: {
      Boolean,
      default: false,
    },

    id: {
      type: String,
      default: null,
    },

    selectedDay: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      inputs: [],
      currentTask: {},
    }
  },

  computed: {
    ...mapGetters(['allTasks']),

    task() {
      if (!this.isNew && this.id && this.allTasks.length) {
        return this.allTasks.find((t) => t.id === this.id)
      }
      return null
    },
  },

  watch: {
    id: {
      handler() {
        this.setupFormInputs()
      },
      immediate: true,
    },

    task: {
      handler() {
        this.setupFormInputs()
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(['createTask', 'updateTask', 'deleteTaskFromStore']),

    setupFormInputs() {
      let title = ''
      let description = ''

      if (!this.isNew && this.task) {
        title = this.task.title
        description = this.task.description
      }

      this.inputs = [
        {
          type: 'text',
          placeholder: 'title',
          field: 'title',
          value: title,
          validations: [
            {
              rule: (val) => required(val),
              errorMessage: 'Title cannot be empty',
            },
            {
              rule: (val) => maxLength(val),
              errorMessage: 'Title must be less than 100 characters',
            },
          ],
        },
        {
          type: 'textarea',
          placeholder: 'Add a description',
          field: 'description',
          value: description,
        },
      ]

      if (!this.isNew && !this.task && this.id) {
        console.warn('Task not found in store for ID')
        this.$router.push('/tasks')
      }
    },

    async saveTask(formData) {
      try {
        if (this.isNew) {
          await this.createTask({ ...formData, selectedDay: this.selectedDay })
        } else {
          const updatedTaskData = { ...formData, id: this.id }

          await this.updateTask(updatedTaskData)
        }
        this.$router.push('/tasks')
      } catch (err) {
        console.error('Failed to save task', err)
      }
    },

    async deleteTask() {
      if (!this.id) return

      try {
        await this.deleteTaskFromStore(this.id)

        this.$router.push('/tasks')
      } catch (err) {
        console.error('Failed to delete task', err)
      }
    },

    cancelEdit() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}

.task-form {
  height: 70vh;
}
</style>
