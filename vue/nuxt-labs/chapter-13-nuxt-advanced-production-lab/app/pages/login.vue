<script setup lang="ts">
import type { LoginRequestBody } from "../../shared/types/auth";

const { statusMessage, login } = useLoginForm();

async function submitLogin(payload: LoginRequestBody) {
  await login(payload);
}

useSeoMeta({
  title: "Login",
  description: "Demo sealed cookie session login page.",
});
</script>

<template>
  <section class="login-page">
    <header>
      <p class="eyebrow">Session demo</p>
      <h1>Login</h1>
      <p>
        Demo users: learner@example.com / learn-nuxt-13 and
        admin@example.com / admin-nuxt-13.
      </p>
    </header>

    <LoginForm @submit="submitLogin" />
    <SessionStatus />
    <p class="status">{{ statusMessage }}</p>
  </section>
</template>

<style scoped>
.login-page {
  display: grid;
  gap: 1rem;
  max-width: 680px;
}

header,
.status {
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

.eyebrow {
  color: #18794e;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
