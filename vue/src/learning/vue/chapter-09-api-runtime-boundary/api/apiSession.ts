import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";

export type DemoSessionHeaders = {
  "X-Demo-Role": string;
  "X-Demo-Session": string;
};

export function getDemoSessionHeaders(): DemoSessionHeaders {
  const authStore = useAuthStore(pinia);

  return {
    "X-Demo-Role": authStore.role ?? "guest",
    "X-Demo-Session": authStore.isSignedIn ? "active" : "anonymous",
  };
}
