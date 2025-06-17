<template>
  <input
    :value="inputValue"
    @input="$emit('update:inputValue', $event.target.value)"
    class="base-input"
  />
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
    },
  },
  emits: ['update:inputValue'],
  methods: {},
}
</script>

<style scoped>
.base-input {
  width: 25vw;
  height: 30px;
  padding: 5px;
  border-radius: 6px;
  border: none;
  box-shadow: inset 3px 3px 3px #000000a4;
}

.base-input:focus {
  outline: none;
}
</style>
