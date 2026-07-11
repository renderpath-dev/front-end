<script setup lang="ts">
import type { LoginRequestBody } from "../../shared/types/auth";

const emit = defineEmits<{
  submit: [payload: LoginRequestBody];
}>();

const credentials = reactive<LoginRequestBody>({
  email: "",
  password: "",
});

function submitLogin() {
  emit("submit", {
    email: credentials.email,
    password: credentials.password,
  });
}
</script>

<template>
  <form class="login-form" @submit.prevent="submitLogin">
    <label>
      Email
      <input v-model="credentials.email" type="email" autocomplete="email" />
    </label>
    <label>
      Password
      <input
        v-model="credentials.password"
        type="password"
        autocomplete="current-password"
      />
    </label>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
.login-form {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #d8e4de;
  border-radius: 1rem;
  background: #ffffff;
}

label {
  display: grid;
  gap: 0.35rem;
  font-weight: 800;
}

input {
  border: 1px solid #cddbd4;
  border-radius: 0.6rem;
  padding: 0.7rem;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  background: #18794e;
  font-weight: 800;
}
</style>
