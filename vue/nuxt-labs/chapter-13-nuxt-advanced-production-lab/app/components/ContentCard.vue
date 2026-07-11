<script setup lang="ts">
import type { ContentCardItem } from "../../shared/types/content";

defineProps<{
  item: ContentCardItem;
}>();
</script>

<template>
  <NuxtLink class="content-card" :to="item.path">
    <span>{{ item.kind }}</span>
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <small v-if="item.date">{{ item.date }}</small>
  </NuxtLink>
</template>

<style scoped>
.content-card {
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  color: inherit;
  background: #ffffff;
  text-decoration: none;
}

span,
small {
  color: #18794e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h3,
p {
  margin: 0;
}
</style>
