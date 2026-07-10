<script setup lang="ts">
import type { UploadQueueItem } from "../contracts/uploadContracts";

defineProps<{
  items: ReadonlyArray<UploadQueueItem>;
}>();

const emit = defineEmits<{
  start: [id: string];
  retry: [id: string];
  remove: [id: string];
}>();

function formatSize(size: number): string {
  return `${(size / 1024).toFixed(1)} KB`;
}
</script>

<template>
  <ElTable :data="items" row-key="id" stripe empty-text="No local files selected">
    <ElTableColumn prop="name" label="File" min-width="180" />
    <ElTableColumn label="Size" width="110">
      <template #default="{ row }">{{ formatSize(row.size) }}</template>
    </ElTableColumn>
    <ElTableColumn prop="type" label="Browser MIME type" min-width="160" />
    <ElTableColumn prop="status" label="Status" width="110" />
    <ElTableColumn label="Failure reason" min-width="170">
      <template #default="{ row }">
        {{ row.failureReason ?? "None" }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="Operations" width="220">
      <template #default="{ row }">
        <ElButton
          v-if="row.status === 'ready'"
          size="small"
          type="primary"
          @click="emit('start', row.id)"
        >
          Simulate
        </ElButton>
        <ElButton
          v-if="row.status === 'failed'"
          size="small"
          type="warning"
          @click="emit('retry', row.id)"
        >
          Retry
        </ElButton>
        <ElButton
          size="small"
          type="danger"
          @click="emit('remove', row.id)"
        >
          Remove
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
