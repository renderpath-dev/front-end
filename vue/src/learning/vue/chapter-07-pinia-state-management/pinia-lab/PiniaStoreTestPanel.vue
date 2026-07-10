<script setup lang="ts">
const storeTestFiles = [
  "authStore.test.ts",
  "permissionStore.test.ts",
  "themeStore.test.ts",
  "cartStore.test.ts",
  "piniaStoreTest.ts",
] as const;
</script>

<template>
  <section class="panel">
    <h3>Store unit-test boundary</h3>
    <ul>
      <li v-for="file in storeTestFiles" :key="file">{{ file }}</li>
    </ul>
    <p>
      Each test activates a fresh Pinia root. Component mounting, browser E2E,
      network mocking, coverage, and CI remain outside this chapter.
    </p>
    <code>npm run test:unit</code>
  </section>
</template>

<style scoped>
.panel {
  padding: 1rem;
  border: 1px solid #94a3b8;
  border-radius: 0.9rem;
  background: #f8fafc;
}

h3 {
  margin-top: 0;
}

code {
  display: inline-block;
  padding: 0.35rem 0.55rem;
  border-radius: 0.4rem;
  color: #e2e8f0;
  background: #0f172a;
}
</style>
