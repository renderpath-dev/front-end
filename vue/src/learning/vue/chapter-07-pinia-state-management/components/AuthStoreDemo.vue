<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import type { DemoUserRole } from "../stores/storeTypes";

const authStore = useAuthStore();
const {
  currentUser,
  isSignedIn,
  displayName,
  role,
  permissions,
  lastSignInRole,
} = storeToRefs(authStore);

const roles: ReadonlyArray<DemoUserRole> = [
  "admin",
  "manager",
  "operator",
];
</script>

<template>
  <section class="panel">
    <p class="eyebrow">Option Store</p>
    <h2>Auth store</h2>
    <p>
      Status: <strong>{{ isSignedIn ? "signed in" : "signed out" }}</strong>
    </p>
    <p>User: {{ displayName }} · Role: {{ role ?? "none" }}</p>
    <p>Last sign-in role: {{ lastSignInRole ?? "none" }}</p>
    <p>Permissions: {{ permissions.join(", ") || "none" }}</p>
    <div class="actions">
      <button
        v-for="roleOption in roles"
        :key="roleOption"
        type="button"
        @click="authStore.signInAs(roleOption)"
      >
        Sign in as {{ roleOption }}
      </button>
      <button type="button" @click="authStore.signOut">Sign out</button>
      <button type="button" @click="authStore.$reset">Reset store</button>
    </div>
    <small>Current user id: {{ currentUser?.id ?? "none" }}</small>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #bbf7d0;
  border-radius: 1rem;
  background: #f0fdf4;
}

.eyebrow {
  margin: 0;
  color: #047857;
  font-weight: 800;
  text-transform: uppercase;
}

h2 {
  margin: 0.35rem 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #15803d;
  border-radius: 0.55rem;
  background: #ffffff;
  cursor: pointer;
}
</style>
