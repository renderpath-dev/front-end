<script setup lang="ts">
const layers = [
  ["Component", "Triggers an intent and renders request state."],
  ["Composable", "Owns loading, data, error, cancellation, and stale results."],
  ["Service", "Owns method, path, query, payload, and response schema."],
  ["Axios client", "Applies shared configuration and interceptors."],
  ["Adapter", "Runs the deterministic local transport."],
  ["Validator", "Turns an unknown payload into checked data or an error."],
  ["Backend", "Remains authoritative for validation and authorization."],
] as const;
</script>

<template>
  <ElCard header="API boundary map" shadow="never">
    <ElSteps direction="vertical" :active="layers.length">
      <ElStep
        v-for="[title, description] in layers"
        :key="title"
        :title="title"
        :description="description"
      />
    </ElSteps>
  </ElCard>
</template>
