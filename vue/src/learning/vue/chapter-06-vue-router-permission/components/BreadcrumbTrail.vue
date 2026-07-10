<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbItems = computed(() =>
  route.matched.flatMap((record) => record.meta.breadcrumb),
);
</script>

<template>
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <span
      v-for="(item, index) in breadcrumbItems"
      :key="`${item}-${index}`"
    >
      <span v-if="index > 0" aria-hidden="true">/</span>
      {{ item }}
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  color: #52616b;
  font-size: 0.85rem;
}
</style>
