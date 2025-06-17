<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.base-button {
  width: 10vw;
  height: 6vh;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  color: #fafafa;
  font-size: 150%;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  box-shadow: inset -2px -2px 5px #000000a4;
}

.base-button:active {
  box-shadow: inset 5px 5px 5px 5px #0000008f;
  /* background-color: #52ac6a; */
  /* text-transform: uppercase; */
}
</style>
