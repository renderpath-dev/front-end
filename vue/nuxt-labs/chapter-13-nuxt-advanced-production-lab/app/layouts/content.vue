<template>
  <div class="content-layout">
    <AppNavigation />
    <main class="content-shell">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.content-layout {
  min-height: 100vh;
  background: #f7faf8;
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

.content-shell {
  width: min(880px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}
</style>
