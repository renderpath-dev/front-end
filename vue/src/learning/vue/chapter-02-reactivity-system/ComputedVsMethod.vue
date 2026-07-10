<script setup lang="ts">
import { computed, ref, watch } from "vue";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type TaskFilter = "all" | "active" | "completed";

type LearningTask = {
  id: number;
  title: string;
  completed: boolean;
};

const cartItems = ref<CartItem[]>([
  { id: 1, name: "Vue Guide", price: 24, quantity: 1 },
  { id: 2, name: "Practice Notebook", price: 8, quantity: 2 },
]);
const unrelatedCounter = ref(0);
const computedEvaluationCount = ref(0);
let methodCallCount = 0;

function subtotalMethod(): number {
  methodCallCount += 1;
  return cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
}

const subtotalComputed = computed(() =>
  cartItems.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
);

const learningTasks = ref<LearningTask[]>([
  { id: 1, title: "Trace reactive reads", completed: true },
  { id: 2, title: "Explain computed caching", completed: false },
  { id: 3, title: "Observe DOM patch timing", completed: false },
]);
const selectedTaskFilter = ref<TaskFilter>("all");

const filteredLearningTasks = computed(() => {
  if (selectedTaskFilter.value === "active") {
    return learningTasks.value.filter((task) => !task.completed);
  }

  if (selectedTaskFilter.value === "completed") {
    return learningTasks.value.filter((task) => task.completed);
  }

  return learningTasks.value;
});

watch(
  subtotalComputed,
  () => {
    computedEvaluationCount.value += 1;
  },
  { immediate: true },
);

function increaseQuantity(itemId: number): void {
  const item = cartItems.value.find((currentItem) => currentItem.id === itemId);

  if (item) {
    item.quantity += 1;
  }
}
</script>

<template>
  <article class="demo-card">
    <p class="topic">computed vs method</p>
    <h3>Cached derived state</h3>

    <ul>
      <li v-for="item in cartItems" :key="item.id">
        <span>{{ item.name }}: {{ item.quantity }} × ${{ item.price }}</span>
        <button type="button" @click="increaseQuantity(item.id)">
          Add quantity
        </button>
      </li>
    </ul>

    <div class="comparison">
      <section>
        <h4>Template method</h4>
        <p>Total: ${{ subtotalMethod().toFixed(2) }}</p>
        <p>Method calls observed: {{ methodCallCount }}</p>
      </section>
      <section>
        <h4>Computed ref</h4>
        <p>Total: ${{ subtotalComputed.toFixed(2) }}</p>
        <p>Repeated read: ${{ subtotalComputed.toFixed(2) }}</p>
        <p>Getter evaluations observed: {{ computedEvaluationCount }}</p>
      </section>
    </div>

    <button type="button" @click="unrelatedCounter += 1">
      Trigger unrelated render: {{ unrelatedCounter }}
    </button>
    <p class="note">
      The method runs when the template renders. The computed getter remains
      pure and its watcher observes a new evaluation only when cart
      dependencies change.
    </p>

    <section class="task-filter">
      <h4>Chapter 01 filtering upgraded to computed</h4>
      <div class="filter-actions">
        <button type="button" @click="selectedTaskFilter = 'all'">All</button>
        <button type="button" @click="selectedTaskFilter = 'active'">
          Active
        </button>
        <button type="button" @click="selectedTaskFilter = 'completed'">
          Completed
        </button>
      </div>
      <ul>
        <li v-for="task in filteredLearningTasks" :key="task.id">
          <span>{{ task.title }}</span>
          <strong>{{ task.completed ? "Complete" : "Active" }}</strong>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.25rem;
  border: 1px solid #cfded7;
  border-radius: 0.9rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #6b4f0b;
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
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem;
  border-radius: 0.6rem;
  background: #faf8f0;
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.comparison section {
  padding: 0.85rem;
  border: 1px solid #e3dcc3;
  border-radius: 0.65rem;
}

h4 {
  margin-top: 0;
}

button {
  padding: 0.5rem 0.7rem;
  border: 1px solid #bcae75;
  border-radius: 0.5rem;
  background: #fffaf0;
  color: #57420c;
  cursor: pointer;
}

.note {
  margin-bottom: 0;
  color: #645f51;
  line-height: 1.6;
}

.task-filter {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e3dcc3;
}

.filter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
</style>
