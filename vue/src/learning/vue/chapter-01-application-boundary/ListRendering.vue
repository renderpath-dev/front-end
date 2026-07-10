<script setup lang="ts">
import { ref } from "vue";

type LearningTask = {
  id: string;
  title: string;
  focus: string;
};

const learningTasks = ref<LearningTask[]>([
  {
    id: "application-entry",
    title: "Trace the application entry",
    focus: "index.html to main.ts",
  },
  {
    id: "root-component",
    title: "Identify the root component",
    focus: "createApp and App.vue",
  },
  {
    id: "template-directives",
    title: "Practice template directives",
    focus: "bindings, events, and lists",
  },
]);
</script>

<template>
  <article class="practice-card">
    <p class="topic">List rendering</p>
    <h2>Chapter Tasks</h2>

    <ul>
      <li v-for="task in learningTasks" :key="task.id">
        <strong>{{ task.title }}</strong>
        <span>{{ task.focus }}</span>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.practice-card {
  padding: 1.25rem;
  border: 1px solid #dce6e1;
  border-radius: 0.9rem;
  background: #ffffff;
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
  margin: 0.35rem 0 0.75rem;
}

ul {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  gap: 0.2rem;
  padding: 0.75rem;
  border-left: 4px solid #42b883;
  background: #f3f8f5;
}

span {
  color: #61717c;
  font-size: 0.9rem;
}
</style>
