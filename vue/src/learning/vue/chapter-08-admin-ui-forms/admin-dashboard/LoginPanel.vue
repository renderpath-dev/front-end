<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
</script>

<template>
  <ElCard class="login-panel" shadow="never">
    <template #header>
      <strong>Local role session</strong>
    </template>
    <p>
      Select a Chapter 07 role to evaluate menu and operation visibility. This
      is client-side learning state, not authentication.
    </p>
    <div class="role-actions">
      <ElButton type="primary" @click="authStore.signInAs('admin')">
        Sign in as admin
      </ElButton>
      <ElButton @click="authStore.signInAs('manager')">
        Sign in as manager
      </ElButton>
      <ElButton @click="authStore.signInAs('operator')">
        Sign in as operator
      </ElButton>
      <ElTag v-if="currentUser" type="success">
        {{ currentUser.displayName }} / {{ currentUser.role }}
      </ElTag>
    </div>
  </ElCard>
</template>

<style scoped>
.login-panel p {
  line-height: 1.6;
}

.role-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
</style>
