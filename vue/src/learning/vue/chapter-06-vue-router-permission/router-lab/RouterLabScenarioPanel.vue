<script setup lang="ts">
import { ref } from "vue";
import {
  isNavigationFailure,
  useRouter,
} from "vue-router";
import {
  currentUser,
  signInAs,
  signOut,
} from "../router/authSession";
import type { RouteRole } from "../router/routeMeta";
import { routeNames } from "../router/routeNames";

const router = useRouter();
const resultMessage = ref("No scenario has run yet.");

function selectRole(role: RouteRole): void {
  signInAs(role);
  resultMessage.value = `Local session changed to ${role}.`;
}

async function openRoles(): Promise<void> {
  const result = await router.push({
    name: routeNames.roles,
  });

  resultMessage.value = isNavigationFailure(result)
    ? `Navigation failure type: ${result.type}`
    : "Navigation completed or redirected.";
}

function clearSession(): void {
  signOut();
  resultMessage.value = "Local session cleared.";
}
</script>

<template>
  <article class="scenario-panel">
    <p class="topic">Permission scenarios</p>
    <h3>Current role: {{ currentUser?.role ?? "signed out" }}</h3>
    <div class="actions">
      <button type="button" @click="selectRole('admin')">Admin</button>
      <button type="button" @click="selectRole('manager')">
        Manager
      </button>
      <button type="button" @click="selectRole('operator')">
        Operator
      </button>
      <button type="button" @click="clearSession">Signed out</button>
      <button type="button" @click="openRoles">
        Try role management
      </button>
    </div>
    <p>{{ resultMessage }}</p>
  </article>
</template>

<style scoped>
.scenario-panel {
  padding: 1rem;
  border: 1px solid #c4d4e3;
  border-radius: 0.75rem;
  background: #f8fbff;
}

.topic {
  margin: 0;
  color: #175cd3;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.75rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

button {
  padding: 0.45rem 0.65rem;
  border: 1px solid #84a4c5;
  border-radius: 0.45rem;
  background: #ffffff;
  color: #184d77;
  cursor: pointer;
}
</style>
