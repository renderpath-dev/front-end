<script setup lang="ts">
const { data, status } = await useFetch("/api/config", {
  key: "runtime-config-api",
});
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Runtime config</p>
    <h2>Public and private config boundary</h2>
    <p>
      The component can read runtimeConfig.public. The server can read private
      runtime config, but this page must not render private values.
    </p>
    <RuntimeConfigViewer />
    <ServerResultPanel
      label="Public config API"
      :status="status"
      description="The API returns public config only."
    />
    <pre>{{ data }}</pre>
  </section>
</template>

<style scoped>
.page-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

h2,
p {
  margin: 0;
}

.eyebrow {
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
