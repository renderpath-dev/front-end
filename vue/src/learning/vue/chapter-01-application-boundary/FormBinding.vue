<script setup lang="ts">
import { ref } from "vue";

type LearningTrack = "template" | "components" | "tooling";

const learnerName = ref("");
const acceptedPracticePlan = ref(false);
const selectedTrack = ref<LearningTrack>("template");
const submittedSummary = ref("");

function submitPlan(): void {
  const displayName = learnerName.value.trim() || "Anonymous learner";
  const planStatus = acceptedPracticePlan.value ? "accepted" : "not accepted";

  submittedSummary.value =
    `${displayName} selected ${selectedTrack.value}; practice plan ${planStatus}.`;
}
</script>

<template>
  <article class="practice-card">
    <p class="topic">Form binding</p>
    <h2>Learning Plan</h2>

    <form @submit.prevent="submitPlan">
      <label>
        Name
        <input v-model.trim="learnerName" type="text" placeholder="Ada" />
      </label>

      <label>
        Track
        <select v-model="selectedTrack">
          <option value="template">Template syntax</option>
          <option value="components">Component boundaries</option>
          <option value="tooling">Vite and type checking</option>
        </select>
      </label>

      <label class="checkbox-label">
        <input v-model="acceptedPracticePlan" type="checkbox" />
        Follow the practice plan
      </label>

      <button type="submit">Save plan</button>
    </form>

    <p v-if="submittedSummary" class="summary" aria-live="polite">
      {{ submittedSummary }}
    </p>
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

form {
  display: grid;
  gap: 0.8rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 700;
}

input,
select {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #b7c8bf;
  border-radius: 0.5rem;
  background: #ffffff;
}

.checkbox-label {
  grid-template-columns: auto 1fr;
  align-items: center;
}

.checkbox-label input {
  width: auto;
}

button {
  width: fit-content;
  padding: 0.65rem 0.9rem;
  border: 0;
  border-radius: 0.55rem;
  background: #18794e;
  color: #ffffff;
  cursor: pointer;
}

.summary {
  margin-bottom: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: #eef7f2;
  line-height: 1.5;
}
</style>
