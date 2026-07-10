<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import type { NormalizedApiError } from "../api/apiErrors";
import type { MockBackendScenario } from "../api/mockBackendScenarios";
import { getDemoSessionHeaders } from "../api/apiSession";
import { readSession } from "../services/authApi";

const authStore = useAuthStore();
const { role } = storeToRefs(authStore);
const scenario = ref<MockBackendScenario>("success");
const error = shallowRef<NormalizedApiError | null>(null);
const sessionResult = ref("");

async function checkSession(): Promise<void> {
  const result = await readSession({ scenario: scenario.value });
  if (result.ok) {
    sessionResult.value = JSON.stringify(result.data);
    error.value = null;
  } else {
    sessionResult.value = "";
    error.value = result.error;
  }
}
</script>

<template>
  <ElCard header="Auth and session boundary" shadow="never">
    <p>Current Pinia role: {{ role ?? "guest" }}</p>
    <p>Demo header: {{ getDemoSessionHeaders()["X-Demo-Role"] }}</p>
    <div class="actions">
      <ElButton @click="authStore.signInAs('admin')">Use admin role</ElButton>
      <ElButton @click="authStore.signOut()">Sign out</ElButton>
      <ElSelect v-model="scenario">
        <ElOption label="Current session" value="success" />
        <ElOption label="Unauthenticated" value="unauthenticated" />
        <ElOption label="Forbidden" value="forbidden" />
      </ElSelect>
      <ElButton type="primary" @click="checkSession">Check session</ElButton>
    </div>
    <p v-if="sessionResult">{{ sessionResult }}</p>
    <ElAlert
      v-if="error"
      :title="error.kind"
      :description="error.message"
      type="error"
      :closable="false"
    />
  </ElCard>
</template>

<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
