<template>
  <button class="base-button" type="button">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  color: #ffffff;
  background: #18794e;
  font-weight: 800;
}
</style>
