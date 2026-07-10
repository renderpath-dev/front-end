<script setup lang="ts">
import ButtonPermissionMatrix from "../permissions/ButtonPermissionMatrix.vue";
import RolePermissionPanel from "../permissions/RolePermissionPanel.vue";
import RolesTablePage from "../tables/RolesTablePage.vue";
</script>

<template>
  <div class="role-page">
    <RolesTablePage />
    <RolePermissionPanel />
    <ButtonPermissionMatrix />
  </div>
</template>

<style scoped>
.role-page {
  display: grid;
  gap: 1rem;
}
</style>
