<script setup lang="ts">
const initialRenderSource = useState<string>(
  "ssr-initial-render-source",
  () => "server-rendered payload value",
);
</script>

<template>
  <section class="page-card">
    <p class="eyebrow">Rendering</p>
    <h2>Universal SSR route</h2>
    <RenderingModeBadge mode="ssr" />
    <p>
      This route avoids browser-only APIs during initial render. The state value
      is created during server rendering and reused during hydration.
    </p>
    <ServerResultPanel
      label="Initial state"
      status="payload"
      :description="initialRenderSource"
    />
    <SsrSafeClock />
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
</style>
