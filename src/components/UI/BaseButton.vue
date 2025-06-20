<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  min-width: 200px;
  width: 10vw;
  height: 6vh;
  border: 2px solid;
  border-radius: 6px;
  background-color: transparent;
  color: inherit;
  font-size: 150%;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  outline: none;
}

.base-button:active {
  color: #8b3510;
}
</style>
