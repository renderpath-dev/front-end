<script setup lang="ts">
import { onMounted } from "vue";
import { useUsers } from "../composables/useUsers";
import ApiErrorPanel from "./ApiErrorPanel.vue";

const state = useUsers();

onMounted(() => {
  void state.reload();
});
</script>

<template>
  <ElCard header="User API panel" shadow="never">
    <div class="toolbar">
      <ElSelect v-model="state.scenario.value">
        <ElOption label="Success" value="success" />
        <ElOption label="Forbidden" value="forbidden" />
        <ElOption label="Server error" value="serverError" />
      </ElSelect>
      <ElButton
        type="primary"
        :loading="state.isLoading.value"
        @click="state.reload"
      >
        Reload users
      </ElButton>
    </div>
    <ApiErrorPanel :error="state.error.value" />
    <ElTable :data="state.users.value" row-key="id" stripe>
      <ElTableColumn prop="name" label="Name" />
      <ElTableColumn prop="email" label="Email" />
      <ElTableColumn prop="role" label="Role" />
      <ElTableColumn prop="status" label="Status" />
    </ElTable>
  </ElCard>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
</style>
