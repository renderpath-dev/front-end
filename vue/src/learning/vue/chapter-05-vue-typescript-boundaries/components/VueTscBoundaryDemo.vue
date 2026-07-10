<script setup lang="ts">
const toolingBoundaries = [
  {
    tool: "Vite dev server",
    responsibility: "Transforms and serves modules without full type checking.",
  },
  {
    tool: "Vue - Official IDE support",
    responsibility: "Reports interactive TypeScript and template diagnostics.",
  },
  {
    tool: "vue-tsc --noEmit",
    responsibility: "Checks the TypeScript and Vue SFC module graph.",
  },
  {
    tool: "npm run build",
    responsibility: "Runs vue-tsc first, then creates the Vite production bundle.",
  },
] as const;
</script>

<template>
  <article class="demo-card">
    <p class="topic">Tooling boundary</p>
    <h3>Transpilation Is Not Type Checking</h3>
    <ul>
      <li v-for="item in toolingBoundaries" :key="item.tool">
        <strong>{{ item.tool }}</strong>
        <span>{{ item.responsibility }}</span>
      </li>
    </ul>
    <p>Run each command separately before claiming its result.</p>
  </article>
</template>

<style scoped>
.demo-card {
  padding: 1.1rem;
  border: 1px solid #d8d2bd;
  border-radius: 0.8rem;
  background: #ffffff;
}

.topic {
  margin: 0;
  color: #85661f;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

h3 {
  margin: 0.35rem 0 0.65rem;
}

ul {
  display: grid;
  gap: 0.55rem;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  gap: 0.2rem;
  padding: 0.6rem;
  border-radius: 0.45rem;
  background: #faf8ef;
}
</style>
