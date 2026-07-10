<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useThemeStore } from "../stores/themeStore";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const { displayName, role, isSignedIn } = storeToRefs(authStore);
</script>

<template>
  <header class="admin-header">
    <div>
      <p class="eyebrow">Vue Pinia Admin State Lab</p>
      <strong>{{ displayName }}</strong>
      <span>{{ role ?? "no role" }}</span>
    </div>
    <div class="actions">
      <button type="button" @click="themeStore.toggleMode">
        Toggle theme
      </button>
      <button
        v-if="isSignedIn"
        type="button"
        @click="authStore.signOut"
      >
        Sign out
      </button>
      <button
        v-else
        type="button"
        @click="authStore.signInAs('manager')"
      >
        Sign in as manager
      </button>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.9rem;
  color: #f8fafc;
  background: #0f766e;
}

.admin-header div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.eyebrow {
  width: 100%;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

button {
  padding: 0.45rem 0.7rem;
  border: 1px solid #ccfbf1;
  border-radius: 0.5rem;
  color: #134e4a;
  background: #ffffff;
  cursor: pointer;
}
</style>
