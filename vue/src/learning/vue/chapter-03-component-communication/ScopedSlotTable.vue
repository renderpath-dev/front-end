<script setup lang="ts">
export type LearningRow = {
  id: number;
  concept: string;
  direction: string;
  owner: string;
};

defineSlots<{
  row(props: { row: LearningRow; index: number }): unknown;
}>();

const rows: LearningRow[] = [
  { id: 1, concept: "Props", direction: "Parent to child", owner: "Parent" },
  { id: 2, concept: "Emits", direction: "Child to parent", owner: "Parent" },
  {
    id: 3,
    concept: "Scoped slot",
    direction: "Child data to parent renderer",
    owner: "Child iteration",
  },
];
</script>

<template>
  <article class="practice-card">
    <p class="topic">Scoped slots</p>
    <h3>Communication Table</h3>
    <ul>
      <li v-for="(row, index) in rows" :key="row.id">
        <slot name="row" :row="row" :index="index">
          {{ row.concept }}: {{ row.direction }}
        </slot>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #cbd8e3;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #32688f;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 1rem;
}

ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  padding: 0.7rem;
  border-radius: 0.55rem;
  background: #f2f7fb;
}
</style>
