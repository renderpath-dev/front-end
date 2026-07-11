<script setup lang="ts">
const { loggedIn, user, session } = useUserSession();

const loggedInAt = computed(() => session.value?.loggedInAt ?? "");
</script>

<template>
  <section class="session-status">
    <h2>Session status</h2>
    <p>Status: {{ loggedIn ? "authenticated" : "anonymous" }}</p>
    <p v-if="user">User: {{ user.name }} ({{ user.role }})</p>
    <p v-if="loggedInAt">Logged in at: {{ loggedInAt }}</p>
  </section>
</template>

<style scoped>
.session-status {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #f8fbf9;
}

h2 {
  margin-top: 0;
}
</style>
