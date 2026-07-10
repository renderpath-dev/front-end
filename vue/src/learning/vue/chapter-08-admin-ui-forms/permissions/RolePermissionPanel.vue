<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";

const authStore = useAuthStore();
const permissionStore = usePermissionStore();
const { currentUser } = storeToRefs(authStore);
</script>

<template>
  <ElCard header="Role and permission boundary" shadow="never">
    <ElDescriptions :column="1" border>
      <ElDescriptionsItem label="Current role">
        {{ currentUser?.role ?? "guest" }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Store permissions">
        {{ permissionStore.visiblePermissionSummary }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Security boundary">
        UI visibility improves interaction only. A backend must authorize every
        protected operation.
      </ElDescriptionsItem>
    </ElDescriptions>
  </ElCard>
</template>
