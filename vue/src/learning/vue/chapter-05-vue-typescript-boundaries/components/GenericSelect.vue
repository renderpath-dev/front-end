<script
  setup
  lang="ts"
  generic="T extends { id: string; label: string }"
>
type Props = {
  items: ReadonlyArray<T>;
  emptyLabel?: string;
};

withDefaults(defineProps<Props>(), {
  emptyLabel: "No typed options available.",
});

const selectedItem = defineModel<T | null>({ required: true });

function selectItem(item: T): void {
  selectedItem.value = item;
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">Generic SFC</p>
    <h3>Generic Select</h3>
    <p v-if="items.length === 0">{{ emptyLabel }}</p>
    <div v-else class="options">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        :class="{ selected: selectedItem?.id === item.id }"
        @click="selectItem(item)"
      >
        {{ item.label }}
      </button>
    </div>
    <p>Selected: {{ selectedItem?.label ?? "None" }}</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #d7cce2;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #71528a;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #987baa;
  border-radius: 0.4rem;
  background: #ffffff;
  cursor: pointer;
}

button.selected {
  background: #76558d;
  color: #ffffff;
}
</style>
