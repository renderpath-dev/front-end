<template>
  <div class="admin-shell">
    <aside>
      <p class="eyebrow">Admin layout</p>
      <NuxtLink to="/">Exit admin</NuxtLink>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-shell {
  display: grid;
  grid-template-columns: minmax(12rem, 16rem) 1fr;
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

aside {
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: 2rem;
  background: #102019;
  color: #ffffff;
}

main {
  padding: 2rem;
}

a {
  color: #8df0b7;
  font-weight: 800;
}

.eyebrow {
  margin: 0;
  color: #8df0b7;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
