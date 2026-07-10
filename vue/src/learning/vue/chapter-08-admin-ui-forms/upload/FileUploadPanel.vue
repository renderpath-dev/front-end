<script setup lang="ts">
import type { UploadFile } from "element-plus";
import { useButtonPermission } from "../composables/useButtonPermission";
import { useUploadQueue } from "../composables/useUploadQueue";
import UploadQueueTable from "./UploadQueueTable.vue";

const uploadQueue = useUploadQueue();
const { isDisabled } = useButtonPermission();

function addFile(uploadFile: UploadFile): void {
  if (uploadFile.raw) {
    uploadQueue.addFiles([uploadFile.raw]);
  }
}

function simulateReadyFiles(): void {
  uploadQueue.items.value
    .filter((item) => item.status === "ready")
    .forEach((item) => uploadQueue.start(item.id));
}
</script>

<template>
  <ElCard shadow="never">
    <template #header>
      <div class="header">
        <strong>Local upload queue</strong>
        <div class="actions">
          <ElButton
            :disabled="isDisabled('uploads:manage')"
            type="primary"
            @click="simulateReadyFiles"
          >
            Simulate ready files
          </ElButton>
          <ElButton
            :disabled="isDisabled('uploads:manage')"
            @click="uploadQueue.clear"
          >
            Clear queue
          </ElButton>
        </div>
      </div>
    </template>

    <ElAlert
      title="Files stay in browser memory. No request or persistence layer is used."
      type="info"
      :closable="false"
      show-icon
    />

    <ElUpload
      class="upload-picker"
      accept=".png,.jpg,.jpeg,.pdf"
      :auto-upload="false"
      :disabled="isDisabled('uploads:manage')"
      :on-change="addFile"
      :show-file-list="false"
    >
      <ElButton :disabled="isDisabled('uploads:manage')">
        Choose local file
      </ElButton>
      <template #tip>
        <div class="el-upload__tip">
          PNG, JPEG, or PDF up to 2 MB. A filename containing "fail" produces a
          deterministic simulated failure.
        </div>
      </template>
    </ElUpload>

    <UploadQueueTable
      :items="uploadQueue.items.value"
      @remove="uploadQueue.remove"
      @retry="uploadQueue.retry"
      @start="uploadQueue.start"
    />
  </ElCard>
</template>

<style scoped>
.header,
.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header {
  justify-content: space-between;
}

.upload-picker {
  margin: 1rem 0;
}
</style>
