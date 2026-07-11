<template>
  <div class="dashboard-layout">
    <AppNavigation />
    <main class="dashboard-shell">
      <aside>
        <p class="eyebrow">Protected area</p>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/account">Account</NuxtLink>
        <NuxtLink to="/admin">Admin</NuxtLink>
      </aside>
      <section>
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #f5f7f9;
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

.dashboard-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

aside {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

a {
  color: #18794e;
  font-weight: 800;
  text-decoration: none;
}

.eyebrow {
  margin: 0;
  color: #587064;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .dashboard-shell {
    grid-template-columns: 1fr;
  }
}
</style>
