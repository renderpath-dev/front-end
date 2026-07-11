<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});

const { loggedIn, user } = useSessionStatus();

useSeoMeta({
  title: "Account",
  description: "Account page that displays safe session data only.",
});
</script>

<template>
  <ProtectedPanel title="Account" status="safe session payload">
    <p>Status: {{ loggedIn ? "authenticated" : "anonymous" }}</p>
    <p v-if="user">Email: {{ user.email }}</p>
  </ProtectedPanel>
</template>
