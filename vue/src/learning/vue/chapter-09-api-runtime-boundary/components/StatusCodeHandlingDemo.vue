<script setup lang="ts">
const rows = [
  [400, "Malformed request", "Fix request syntax or shape"],
  [401, "Unauthenticated", "Start or restore a valid session"],
  [403, "Authenticated but forbidden", "Request access"],
  [404, "Resource not found", "Return to a valid resource"],
  [409, "State conflict", "Refresh and reconcile"],
  [422, "Backend validation failed", "Map field errors to the form"],
  [500, "Service failure", "Show recovery and retry safe reads"],
] as const;
</script>

<template>
  <ElCard header="HTTP status handling" shadow="never">
    <ElTable :data="rows" stripe>
      <ElTableColumn label="Status" width="90">
        <template #default="{ row }">{{ row[0] }}</template>
      </ElTableColumn>
      <ElTableColumn label="Meaning">
        <template #default="{ row }">{{ row[1] }}</template>
      </ElTableColumn>
      <ElTableColumn label="UI action">
        <template #default="{ row }">{{ row[2] }}</template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
</template>
