<script setup lang="ts">
defineProps<{
  readonly title: string;
  readonly items: ReadonlyArray<string>;
}>();
</script>

<template>
  <section class="payload-card">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>

<style scoped>
.payload-card {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h3 {
  margin-top: 0;
}
</style>
