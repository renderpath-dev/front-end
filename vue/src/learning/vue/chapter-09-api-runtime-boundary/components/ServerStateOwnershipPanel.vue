<script setup lang="ts">
import { useServerStateBoundary } from "../composables/useServerStateBoundary";

const { rows } = useServerStateBoundary();
</script>

<template>
  <ElCard header="Server state ownership" shadow="never">
    <ElTable :data="rows" stripe>
      <ElTableColumn prop="state" label="State" />
      <ElTableColumn prop="owner" label="Owner" />
      <ElTableColumn prop="reason" label="Reason" min-width="260" />
    </ElTable>
  </ElCard>
</template>
