import { createPinia, setActivePinia } from "pinia";
import type { Component } from "vue";
import { mount } from "@vue/test-utils";
import { ElementPlus } from "../../chapter-08-admin-ui-forms/ui/elementPlus";

export function mountWithPlugins(component: Component) {
  const pinia = createPinia();
  setActivePinia(pinia);

  return {
    pinia,
    wrapper: mount(component, {
      global: {
        plugins: [pinia, ElementPlus],
      },
    }),
  };
}
