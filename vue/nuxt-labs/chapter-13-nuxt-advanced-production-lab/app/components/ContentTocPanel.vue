<script setup lang="ts">
defineProps<{
  items: ReadonlyArray<string>;
}>();
</script>

<template>
  <aside class="toc-panel">
    <h2>Page outline</h2>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <p v-else>No outline data was generated for this page.</p>
  </aside>
</template>

<style scoped>
.toc-panel {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2 {
  margin-top: 0;
  font-size: 1rem;
}

p {
  margin-bottom: 0;
  color: #587064;
}
</style>
