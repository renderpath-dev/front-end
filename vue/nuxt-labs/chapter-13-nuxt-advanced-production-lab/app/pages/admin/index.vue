<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated", "admin-only"],
});

const { data, pending, error } = await useAdminReport();

useSeoMeta({
  title: "Admin",
  description: "Admin page backed by a protected server route.",
});
</script>

<template>
  <ProtectedPanel title="Admin report" status="server role check">
    <p v-if="pending">Loading admin report...</p>
    <p v-else-if="error">Admin report was rejected.</p>
    <template v-else-if="data">
      <p>Report: {{ data.reportId }}</p>
      <p>Generated for: {{ data.generatedFor.name }}</p>
      <ServerOnlySecretPanel
        :private-config-available="data.privateConfigAvailable"
      />
      <ul>
        <li v-for="record in data.records" :key="record">{{ record }}</li>
      </ul>
    </template>
  </ProtectedPanel>
</template>
