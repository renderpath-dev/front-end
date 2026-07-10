<script setup lang="ts">
const checks = [
  "Raw response starts as unknown",
  "Schema validates every endpoint response",
  "Service returns ApiResult",
  "Composable owns loading, error, and data",
  "UI never receives AxiosError",
  "Server state is not stored in Pinia",
  "Frontend auth is not backend authorization",
  "Cancellation and timeout are separate",
  "Retry respects idempotency",
] as const;
</script>

<template>
  <ElCard header="API boundary checklist" shadow="never">
    <ElCheckTag
      v-for="check in checks"
      :key="check"
      :checked="true"
      class="check"
    >
      {{ check }}
    </ElCheckTag>
  </ElCard>
</template>

<style scoped>
.check {
  margin: 0.25rem;
}
</style>
