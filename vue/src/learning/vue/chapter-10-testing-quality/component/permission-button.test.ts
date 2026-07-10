import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import PermissionButton from "../../chapter-08-admin-ui-forms/permissions/PermissionButton.vue";
import { ElementPlus } from "../../chapter-08-admin-ui-forms/ui/elementPlus";

function mountButton(role: "admin" | "operator", mode: "hidden" | "disabled") {
  const pinia = createPinia();
  setActivePinia(pinia);
  useAuthStore().signInAs(role);

  return mount(PermissionButton, {
    props: {
      permission: "users:delete",
      mode,
    },
    slots: {
      default: "Delete user",
    },
    global: {
      plugins: [pinia, ElementPlus],
    },
  });
}

describe("PermissionButton", () => {
  it("emits a click for an allowed role", async () => {
    const wrapper = mountButton("admin", "disabled");

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("disables or hides the control for a denied role", async () => {
    const disabled = mountButton("operator", "disabled");
    const hidden = mountButton("operator", "hidden");

    await disabled.find("button").trigger("click");

    expect(disabled.find("button").attributes("disabled")).toBeDefined();
    expect(disabled.emitted("click")).toBeUndefined();
    expect(hidden.find("button").exists()).toBe(false);
  });
});
