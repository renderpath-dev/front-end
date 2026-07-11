<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});

const { data, pending, error } = await useAccountProfile();

useSeoMeta({
  title: "Dashboard",
  description: "Protected dashboard page guarded by client UX and server API.",
});
</script>

<template>
  <ProtectedPanel title="Dashboard" status="client middleware plus server API">
    <p v-if="pending">Loading profile...</p>
    <p v-else-if="error">Profile request was rejected.</p>
    <template v-else-if="data">
      <p>{{ data.summary }}</p>
      <p>User: {{ data.user.name }} ({{ data.user.role }})</p>
    </template>
  </ProtectedPanel>
</template>
