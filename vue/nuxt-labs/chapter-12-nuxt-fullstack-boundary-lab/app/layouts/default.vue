<template>
  <div class="app-shell">
    <header class="shell-header">
      <p class="eyebrow">Nuxt Chapter 12 Lab</p>
      <h1>Full-stack rendering boundary</h1>
      <AppNavigation />
    </header>

    <main class="shell-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(24, 121, 78, 0.16), transparent 30rem),
    #f5f7f9;
  color: #213547;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.shell-header,
.shell-main {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.shell-header {
  display: grid;
  gap: 1rem;
  padding: 2rem 0 1rem;
}

.shell-header h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.08;
}

.shell-main {
  display: grid;
  gap: 1rem;
  padding: 1rem 0 3rem;
}

.eyebrow {
  margin: 0;
  color: #18794e;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
