<script setup lang="ts">
type ProductFilter = "all" | "learning" | "tooling";

defineProps<{
  currentFilter: ProductFilter;
}>();

const emit = defineEmits<{
  change: [filter: ProductFilter];
}>();

const filterOptions: Array<{ value: ProductFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "learning", label: "Learning" },
  { value: "tooling", label: "Tooling" },
];
</script>

<template>
  <div class="filter-panel" aria-label="Filter products">
    <button
      v-for="option in filterOptions"
      :key="option.value"
      type="button"
      :class="{ active: currentFilter === option.value }"
      :aria-pressed="currentFilter === option.value"
      @click="emit('change', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #9eb8ab;
  border-radius: 999px;
  background: #ffffff;
  color: #315f49;
  cursor: pointer;
}

button.active {
  border-color: #18794e;
  background: #def3e7;
  color: #0f5c37;
}
</style>
