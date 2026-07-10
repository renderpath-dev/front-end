import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "../stores/authStore";
import { activateFreshPinia } from "./piniaStoreTest";

describe("auth store", () => {
  beforeEach(() => {
    activateFreshPinia();
  });

  it("signs in with the selected demo role", () => {
    const authStore = useAuthStore();

    authStore.signInAs("manager");

    expect(authStore.isSignedIn).toBe(true);
    expect(authStore.role).toBe("manager");
    expect(authStore.permissions).toContain("users:view");
    expect(authStore.lastSignInRole).toBe("manager");
  });

  it("signs out without erasing the last sign-in role", () => {
    const authStore = useAuthStore();

    authStore.signInAs("operator");
    authStore.signOut();

    expect(authStore.isSignedIn).toBe(false);
    expect(authStore.currentUser).toBeNull();
    expect(authStore.lastSignInRole).toBe("operator");
  });

  it("resets option-store state", () => {
    const authStore = useAuthStore();

    authStore.signInAs("admin");
    authStore.$reset();

    expect(authStore.currentUser).toBeNull();
    expect(authStore.signInStatus).toBe("signed-out");
    expect(authStore.lastSignInRole).toBeNull();
  });
});
