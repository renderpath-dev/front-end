<template>
  <div class="app-shell">
    <AppNavigation />
    <main class="page-shell">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(66, 184, 131, 0.16), transparent 36rem),
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

.page-shell {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}
</style>
