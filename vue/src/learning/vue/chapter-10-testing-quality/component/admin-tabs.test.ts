import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AdminTabs from "../../chapter-08-admin-ui-forms/layout/AdminTabs.vue";
import { ElementPlus } from "../../chapter-08-admin-ui-forms/ui/elementPlus";

describe("AdminTabs", () => {
  it("renders labels and updates its model through the public interface", async () => {
    const wrapper = mount(AdminTabs, {
      props: {
        modelValue: "dashboard",
        tabs: [
          { id: "dashboard", label: "Dashboard", closable: false },
          { id: "users", label: "Users", closable: true },
        ],
      },
      global: {
        plugins: [ElementPlus],
      },
    });

    expect(wrapper.text()).toContain("Dashboard");
    expect(wrapper.text()).toContain("Users");

    wrapper
      .findComponent({ name: "ElTabs" })
      .vm.$emit("update:modelValue", "users");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["users"]);
  });
});
