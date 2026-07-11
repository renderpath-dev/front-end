import type { LoginRequestBody, LoginResponse } from "../../shared/types/auth";

export function useLoginForm() {
  const statusMessage = ref("Use learner@example.com or admin@example.com.");
  const { fetch: refreshSession } = useUserSession();

  async function login(payload: LoginRequestBody) {
    try {
      await $fetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: payload,
      });
      await refreshSession();
      statusMessage.value = "Login succeeded.";
      await navigateTo(toSafeRedirect(useRoute().query.redirect));
    } catch {
      statusMessage.value = "Login failed. Check credentials or payload shape.";
    }
  }

  return {
    statusMessage,
    login,
  };
}
