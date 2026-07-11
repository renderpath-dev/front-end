<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth-demo",
});

const { data, status } = await useFetch("/api/admin/summary", {
  key: "admin-summary",
});
</script>

<template>
  <section class="admin-card">
    <p class="eyebrow">Admin route</p>
    <h2>Admin layout and route middleware</h2>
    <p>
      This page uses definePageMeta to select the admin layout and a named route
      middleware. It does not implement real authentication.
    </p>
    <ServerResultPanel
      label="Admin summary"
      :status="status"
      description="The server handler checks private config without returning it."
    />
    <pre>{{ data }}</pre>
  </section>
</template>

<style scoped>
.admin-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

pre {
  overflow: auto;
  padding: 1rem;
  border-radius: 0.8rem;
  background: #102019;
  color: #eaf6ef;
}
</style>
