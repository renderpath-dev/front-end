<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  await clear();
  await navigateTo("/login");
}
</script>

<template>
  <header class="site-header">
    <NuxtLink class="brand" to="/">Nuxt Advanced Lab</NuxtLink>
    <nav aria-label="Primary navigation">
      <NuxtLink to="/docs">Docs</NuxtLink>
      <NuxtLink to="/blog">Blog</NuxtLink>
      <NuxtLink to="/gallery">Gallery</NuxtLink>
      <NuxtLink to="/testing">Testing</NuxtLink>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <NuxtLink to="/admin">Admin</NuxtLink>
    </nav>
    <div class="session-actions">
      <span v-if="loggedIn && user">{{ user.name }}</span>
      <NuxtLink v-if="!loggedIn" to="/login">Login</NuxtLink>
      <button v-else type="button" @click="logout">Logout</button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem max(1rem, calc((100vw - 1120px) / 2));
  border-bottom: 1px solid #d8e4de;
  background: rgba(255, 255, 255, 0.94);
}

.brand {
  color: #213547;
  font-size: 1.05rem;
  font-weight: 900;
}

nav,
.session-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

a {
  color: #18794e;
  font-weight: 800;
  text-decoration: none;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  color: #ffffff;
  background: #18794e;
  font-weight: 800;
}
</style>
