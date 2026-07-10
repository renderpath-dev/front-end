<script setup lang="ts">
import PermissionButton from "./PermissionButton.vue";

const operations = [
  "users:create",
  "users:edit",
  "users:delete",
  "roles:edit",
  "products:create",
  "products:edit",
  "products:delete",
  "orders:status",
  "uploads:manage",
] as const;
</script>

<template>
  <ElCard header="Button permission matrix" shadow="never">
    <p>
      Disabled buttons explain unavailable UI intent. Hidden buttons reduce
      noise. Neither mode replaces server authorization.
    </p>
    <div class="matrix">
      <div v-for="operation in operations" :key="operation" class="row">
        <code>{{ operation }}</code>
        <PermissionButton :permission="operation" mode="disabled">
          Disabled mode
        </PermissionButton>
        <PermissionButton :permission="operation" mode="hidden">
          Hidden mode
        </PermissionButton>
      </div>
    </div>
  </ElCard>
</template>

<style scoped>
p {
  line-height: 1.6;
}

.matrix {
  display: grid;
  gap: 0.6rem;
}

.row {
  display: grid;
  grid-template-columns: minmax(150px, 1fr) auto auto;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 680px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
