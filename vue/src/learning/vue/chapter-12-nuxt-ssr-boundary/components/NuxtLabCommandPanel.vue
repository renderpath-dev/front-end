<script setup lang="ts">
const commands: ReadonlyArray<string> = [
  "cd nuxt-labs/chapter-12-nuxt-fullstack-boundary-lab",
  "npm install",
  "npm run dev",
  "npm run typecheck",
  "npm run build",
  "npm run generate",
  "npm run preview",
];
</script>

<template>
  <section class="panel command-panel">
    <h3>Run the separate Nuxt lab</h3>
    <p>
      The Vite page only displays this summary. The Nuxt runtime starts from the
      lab folder and uses port 3030 for development and port 3031 for preview.
    </p>
    <ol>
      <li v-for="command in commands" :key="command">
        <code>{{ command }}</code>
      </li>
    </ol>
    <p class="ports">
      Dev: <code>http://localhost:3030</code> Preview:
      <code>http://localhost:3031</code>
    </p>
  </section>
</template>

<style scoped>
.panel {
  padding: 1.25rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.command-panel {
  background: #102019;
  color: #eaf6ef;
}

p {
  line-height: 1.65;
}

ol {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.25rem;
}

code {
  color: #8df0b7;
  font-weight: 800;
}

.ports {
  margin-bottom: 0;
}
</style>
