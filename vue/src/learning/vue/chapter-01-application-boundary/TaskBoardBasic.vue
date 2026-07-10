<script setup lang="ts">
import { ref } from "vue";

type TaskFilter = "all" | "active" | "completed";

type TaskItem = {
  id: number;
  title: string;
  completed: boolean;
};

type FilterOption = {
  value: TaskFilter;
  label: string;
};

const tasks = ref<TaskItem[]>([
  { id: 1, title: "Trace index.html to main.ts", completed: true },
  { id: 2, title: "Explain createApp and mount", completed: false },
  { id: 3, title: "Practice Vue template directives", completed: false },
]);
const newTaskTitle = ref("");
const selectedFilter = ref<TaskFilter>("all");
const nextTaskId = ref(4);

const filterOptions: FilterOption[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

function addTask(): void {
  const title = newTaskTitle.value.trim();

  if (!title) {
    return;
  }

  tasks.value.push({
    id: nextTaskId.value,
    title,
    completed: false,
  });
  nextTaskId.value += 1;
  newTaskTitle.value = "";
}

function toggleTask(taskId: number): void {
  const task = tasks.value.find((currentTask) => currentTask.id === taskId);

  if (task) {
    task.completed = !task.completed;
  }
}

function filteredTasks(): TaskItem[] {
  if (selectedFilter.value === "active") {
    return tasks.value.filter((task) => !task.completed);
  }

  if (selectedFilter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }

  return tasks.value;
}
</script>

<template>
  <section class="task-board" aria-labelledby="task-board-title">
    <header class="board-header">
      <div>
        <p class="topic">Chapter integration</p>
        <h2 id="task-board-title">Task Board Basic</h2>
      </div>
      <span class="task-count">{{ tasks.length }} tasks</span>
    </header>

    <form class="task-form" @submit.prevent="addTask">
      <label for="new-task">New learning task</label>
      <div class="task-form-row">
        <input
          id="new-task"
          v-model="newTaskTitle"
          type="text"
          placeholder="Add a Chapter 01 task"
        />
        <button type="submit">Add task</button>
      </div>
    </form>

    <div class="filters" aria-label="Filter tasks">
      <button
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        type="button"
        :class="{ active: selectedFilter === filterOption.value }"
        :aria-pressed="selectedFilter === filterOption.value"
        @click="selectedFilter = filterOption.value"
      >
        {{ filterOption.label }}
      </button>
    </div>

    <ul v-if="filteredTasks().length > 0" class="task-list">
      <li
        v-for="task in filteredTasks()"
        :key="task.id"
        :class="{ completed: task.completed }"
      >
        <label>
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id)"
          />
          <span>{{ task.title }}</span>
        </label>
      </li>
    </ul>
    <p v-else class="empty-state">No tasks match this filter.</p>
  </section>
</template>

<style scoped>
.task-board {
  padding: 1.5rem;
  border: 1px solid #cfe0d7;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 0.75rem 2rem rgba(33, 53, 71, 0.07);
}

.board-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.topic {
  margin: 0;
  color: #18794e;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0 1rem;
  font-size: 1.75rem;
}

.task-count {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #eaf7f0;
  color: #12633f;
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
}

.task-form {
  display: grid;
  gap: 0.45rem;
}

.task-form > label {
  font-weight: 800;
}

.task-form-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
}

.task-form input {
  min-width: 0;
  padding: 0.75rem;
  border: 1px solid #afc4b9;
  border-radius: 0.55rem;
}

button {
  padding: 0.65rem 0.9rem;
  border: 1px solid #bad0c4;
  border-radius: 0.55rem;
  background: #eff6f2;
  color: #174f37;
  font-weight: 700;
  cursor: pointer;
}

.task-form button {
  border-color: #18794e;
  background: #18794e;
  color: #ffffff;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0;
}

.filters button.active {
  border-color: #18794e;
  background: #dff3e8;
}

.task-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-list li {
  padding: 0.75rem;
  border: 1px solid #e0e8e4;
  border-radius: 0.6rem;
  background: #fafcfb;
}

.task-list label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
}

.task-list .completed span {
  color: #718079;
  text-decoration: line-through;
}

.empty-state {
  margin: 0;
  padding: 1rem;
  border-radius: 0.6rem;
  background: #f5f7f6;
  color: #5f6f67;
}

@media (max-width: 560px) {
  .task-form-row {
    grid-template-columns: 1fr;
  }
}
</style>
