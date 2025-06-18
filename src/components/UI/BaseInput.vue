<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="base-input"
  />
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
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
