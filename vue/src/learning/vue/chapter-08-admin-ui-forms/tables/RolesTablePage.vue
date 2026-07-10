<script setup lang="ts">
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { createAdminRoles } from "../contracts/adminMockData";
import type { RoleFormModel } from "../contracts/formContracts";
import RoleForm from "../forms/RoleForm.vue";
import PermissionButton from "../permissions/PermissionButton.vue";

const roles = ref<Array<RoleFormModel>>(createAdminRoles());

const dialogVisible = ref(false);
const draft = ref<RoleFormModel>({ ...roles.value[0], permissions: [] });

const permissionSummary = computed(() =>
  draft.value.permissions.join(", "),
);

function openRole(role: RoleFormModel): void {
  draft.value = {
    ...role,
    permissions: [...role.permissions],
  };
  dialogVisible.value = true;
}

function commitRole(): void {
  roles.value = roles.value.map((role) =>
    role.id === draft.value.id
      ? { ...draft.value, permissions: [...draft.value.permissions] }
      : role,
  );
  dialogVisible.value = false;
  ElMessage.success("Role visibility model updated locally");
}
</script>

<template>
  <ElCard header="Role management" shadow="never">
    <ElTable :data="roles" row-key="id" stripe>
      <ElTableColumn prop="name" label="Name" />
      <ElTableColumn prop="role" label="Role" />
      <ElTableColumn label="Visible capabilities" min-width="280">
        <template #default="{ row }">
          {{ row.permissions.join(", ") }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="Operations" width="120">
        <template #default="{ row }">
          <PermissionButton
            permission="roles:edit"
            @click="openRole(row)"
          >
            Edit
          </PermissionButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElDialog
      v-model="dialogVisible"
      title="Edit role visibility"
      width="min(520px, 92vw)"
    >
      <RoleForm
        v-model="draft"
        @cancel="dialogVisible = false"
        @submit="commitRole"
      />
      <p class="summary">Draft summary: {{ permissionSummary || "None" }}</p>
    </ElDialog>
  </ElCard>
</template>

<style scoped>
.summary {
  margin-bottom: 0;
  color: var(--el-text-color-secondary);
}
</style>
