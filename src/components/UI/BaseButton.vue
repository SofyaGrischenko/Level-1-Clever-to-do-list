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
  min-width: 200px;
  width: 10vw;
  height: 6vh;
  border: 2px solid;
  border-radius: 6px;
  background-color: transparent;
  color: #fafafa;
  font-size: 150%;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  
}

.base-button:active {
  /* box-shadow: inset 5px 5px 5px 5px #0000008f; */
  /* background-color: #52ac6a; */
  color: #8b3510;
}
</style>
